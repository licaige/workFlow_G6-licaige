import fs from 'fs'
import path from 'path'
import axios from 'axios'
(async function () {
  const checkPath = async function (path) {
    try {
      await fs.promises.access(path)
    } catch {
      fs.mkdirSync(path)
    }
    return true
  }

  const basePath = './Web全栈架构师033期'
  await checkPath(basePath)

  const course_id = 217585;

  const config = {
    headers:
    {
      Authorization: 'Bearer pc:fedfb5e49832ff341961dc72f561050a',
      cookie: 'gr_user_id=0a07d2b7-92f7-424f-a7f2-428f0bd95aab; kd_user_id=5b3e018a-1146-4603-a423-6bee847765c6; 99f53b614ce96c83_gr_last_sent_cs1=56735231; topic_visitor=95ab5d07-ddbd-fbc3-6cf9-5e7cc837f34f; figui=j1fTValY3R253765; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2256735231%22%2C%22first_id%22%3A%2217a579840b2761-0b988be78f10a5-3e604809-2073600-17a579840b39ba%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E5%BC%80%E8%AF%BE%E5%90%A7%22%2C%22%24latest_referrer%22%3A%22https%3A%2F%2Fwww.baidu.com%2Fother.php%22%7D%2C%22%24device_id%22%3A%2217a579840b2761-0b988be78f10a5-3e604809-2073600-17a579840b39ba%22%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTdkZmI4NTc2YzgzZjgtMDJjMmM2MzJiNTU3OTRhLTNlNjA0ODA5LTIwNzM2MDAtMTdkZmI4NTc2YzlhZDQiLCIkaWRlbnRpdHlfbG9naW5faWQiOiI1NjczNTIzMSJ9%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%2256735231%22%7D%7D; Hm_lvt_156e88c022bf41570bf96e74d090ced7=1650126483,1650163777,1650279445,1650365639; access-edu_online=fedfb5e49832ff341961dc72f561050a; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_log_id=LoFUv5ywLM2mHkWPN5L%3A77a6dd47-ef82-446e-9d32-d676deaa10cc%3A99795d64-0882-4c8a-9013-562319bae7ae; 99f53b614ce96c83_gr_session_id=6d4ac829-abef-4b93-bc51-fe2bd57f8a30; 99f53b614ce96c83_gr_last_sent_sid_with_cs1=6d4ac829-abef-4b93-bc51-fe2bd57f8a30; 99f53b614ce96c83_gr_session_id_6d4ac829-abef-4b93-bc51-fe2bd57f8a30=true; 99f53b614ce96c83_gr_cs1=56735231; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_view_log_id=xxMYqtVOl7fqB9Xqy9f; kkb_edu_session=eyJpdiI6IldGSEZXazRlQkRsdXdWNk04WnhuZmc9PSIsInZhbHVlIjoiNlVOSlVEaDMwK0tCXC9USGZvVzZ0V2tcL3N3aTR3bitoemp5ZVVNZHhGdnphcUp0TWlQd0wxUEVVOXU1WWhyXC80TyIsIm1hYyI6ImEyMTk4NDkyZmFmODI4MjQ5YmY5N2EzNDI3MmE2M2Y3NGI0OTEyMzRjZDMwODhmZGIxOWNhMGI4NDZjMDNlMTQifQ%3D%3D; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_kuickDeal_pageIndex=1; kd_5d6526d7-3c9f-460b-b6cf-ba75397ce1ac_kuickDeal_leaveTime=1654244144978'
    }
  }


  const courseUrl = `https://weblearn.kaikeba.com/student/courseinfo?course_id=${course_id}&__timestamp=1653898285046`  
  const chapterUrl = `https://weblearn.kaikeba.com/student/chapterinfo?course_id=${course_id}&chapter_id=`  
  const mediaUrl ='https://api-vod.baoshiyun.com/vod/v1/platform/media/detail'

  const accessToken = '7ffe1188dd654eef9c2f26d6fb69de9e'

  const { data: { data: courseInfo } } = await axios.get(courseUrl, config)
  const chapterList = courseInfo.chapter_list
  console.log(chapterList);


  let allText = ''
  console.log(chapterList.length);
  for (let i = 0; i < chapterList.length; i++) {

    const chapterName = `${i + 1}、${chapterList[i].chapter_name}`
    const chapterPath = `${basePath}/${chapterName}`
    console.log(await checkPath(chapterPath))
    const url = chapterUrl + chapterList[i].chapter_id
    const { data: { data: chapterInfo } } = await axios.get(url, config)
    // console.log(chapterInfo);

    const sectionList = chapterInfo.section_list
    for (let j = 0; j < sectionList.length; j++) {

      // console.log(sectionList[0].group_list[0].content_list[0].content.length);
      const groupInfo = sectionList[j].group_list[0]
      let name = groupInfo.group_name.replace(/\//g, '-')
      const groupName = `${j + 1}、${name}`
      const groupPath = `${chapterPath}/${groupName}`
      console.log(await checkPath(groupPath))

      const contentList = groupInfo.content_list
      const fileName = groupPath + '/' + name + '.txt'
      for (let k = 0; k < contentList.length; k++) {
        // if(k) break
        const { content: contents, content_type, content_title } = contentList[k]

        if (content_type === 3 || content_type === 7) {
          // fs.rmSync(fileName)
          let contentText = ''
          for (let l = 0; l < contents.length; l++) {
            const { callback_key: mediaId } = contents[l]
            const params = { mediaId, accessToken }
            const { data: { data: videoInfo } } = await axios.get(mediaUrl, { ...config, params })
            
            const { playURL } = videoInfo.mediaMetaInfo.videoGroup[0]
            console.log(playURL);
            contentText += `ffmpeg -i ${playURL} -c copy -bsf:a aac_adtstoasc ./${content_title}--${l < 9 ? 0 : ''}${l + 1}.mp4\n`
            allText += `ffmpeg -i ${playURL} -c copy -bsf:a aac_adtstoasc "${path.resolve(groupPath)}/${content_title}--${l < 9 ? 0 : ''}${l + 1}.mp4"\n`
          }
          contentText += '\n'
          allText += '\n'
          fs.writeFileSync(fileName, contentText, { flag: 'a+' })
        }

        if (content_type === 6) {
          for (let l = 0; l < contents.length; l++) {
            const { name, url } = contents[l]
            const file = groupPath + '/' + name
            const writer = fs.createWriteStream(file)
            const response = await axios({ url, responseType: 'stream' })
            response.data.pipe(writer)
          }
        }
      }
    }
  }
  fs.writeFileSync('./video/allText.txt', allText)
})()