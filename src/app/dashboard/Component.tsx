export default function Component ({userId, id, title, completed} : {userId: number, id: number, title: string, completed: boolean} ) {
    return(
        <div>
            <p>UserId: {userId}</p>
            <p>id: {id}</p>
            <p>title : {title}</p>
            <p>completed: {completed ? "true" : "false"} </p>
        </div>
    )
}