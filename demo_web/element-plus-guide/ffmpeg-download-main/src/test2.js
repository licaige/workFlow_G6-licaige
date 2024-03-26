import { exec, execSync } from 'child_process'
const t = `ffmpeg -i 01.mp4 -c copy "L:\work2022\ffmpeg-download\video\demo1.mp4"`
const task = `ffmpeg -i "https://v26-web.douyinvod.com/453c9c7aac27077b031c3a819bfa1353/629c6e80/video/tos/cn/tos-cn-ve-15c001-alinc2/bd18265194464ec4999b4f413989d578/?a=6383&ch=5&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&cv=1&br=423&bt=423&cs=0&ds=4&ft=t2zLrtjjM95MxrKqTZmCTeK_ScoApVB784vrKpw9P4do0&mime_type=video_mp4&qs=0&rc=Nzc3NzU1aTM7NDNmaTc2M0Bpanlkd2Y6Zmg1ZDMzNGkzM0BiLTM2Ni42XjUxNF9fNC4xYSNyMXAxcjQwZTBgLS1kLS9zcw%3D%3D&l=202206051547510101510701424497197B" -c copy -bsf:a aac_adtstoasc "L:\\work2022\\ffmpeg-download\\video\\demo6.mp4"`
exec(task, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
  })