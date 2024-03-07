import React, { useDeferredValue, useEffect, useState } from 'react';
interface Props {
    keyword: string;
}
function getWords(keyword:string){
    let words = new Array(10000).fill(0).map((item:number,index:number)=>keyword+index);
    return Promise.resolve(words);
}
function Suggestions(props: Props) {
    let [words, setWords] = useState<Array<string>>([]);
    useEffect(()=>{
        getWords(props.keyword).then((words:Array<string>)=>{
            //开启渐变更新 本质就是低优先级的更新
            //startTransition(()=>setWords(words));
            setWords(words)
        });
    },[props.keyword]);
    return (
        <ul>
            {
                words.map((word: string) => <li key={word}>{word}</li>)
            }
        </ul>
    )
}
export default function () {
    const [keyword, setKeyword] = useState<string>('');
    const deferredText = useDeferredValue(keyword);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }
    return (
        <div>
            关键字 <input value={keyword} onChange={handleChange} />
            <Suggestions keyword={deferredText} />
        </div>
    )
}