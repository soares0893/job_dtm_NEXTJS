import axios from 'axios';
import { useState } from 'react';
import style from '../../../css/Card.module.css';

export default function BoardForUnits(props) {

    async function deleteById(title) {
        await axios.delete('https://job-dtm.vercel.app/api/forUnits', { data: { title: title } }).then(
            response => {
                console.log(response)
                props.delete('forUnits')
            }
        )
    }
    
    return (
        <div className={style.div}>
            {props.value.map(e =>
                <div className={style.card} style={{ gridColumn: e.width}} key={Math.random()}>
                    <button
                        id={e.title}
                        className={style.deleteBtn}
                        //@ts-ignore
                        onClick={(e) => { deleteById((e.target as HTMLLIElement).id) }}>
                        X
                    </button>
                    <table key={Math.random()}>
                    <tbody>
                        <tr><td>{e.data}</td></tr>
                        <tr><td>{e.title}</td></tr>
                        <tr><td>{e.subtitle}</td></tr>
                        <tr><td>{e.subject}</td></tr>
                    </tbody>
                </table>
                </div>
            )}
        </div>
    )
}