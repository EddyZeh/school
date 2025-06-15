import Component from "./Component"


async function getTypiCodeFetcher(){
    try {
        const val = await fetch("https://jsonplaceholder.typicode.com/todos")
        return val.json()
    }
    catch(err) {console.log(err)}

}

 export default async function Page(){
    const values = [{
        userId : 10,
        id : 200,
        title: 'Computational Tools',
        completed: false
    }, {
        userId : 20,
        id : 300,
        title: 'Linear Circuts',
        completed: true
    },
        {
            userId : 30,
            id : 400,
            title: 'Whatever Tools',
            completed: false
        }, {
            userId : 40,
            id : 500,
            title: 'Digital Circuts',
            completed: true
        },
        {
            userId : 50,
            id : 600,
            title: 'Computational Tools',
            completed: false
        }, {
            userId : 20,
            id : 300,
            title: 'Linear Circuts',
            completed: true
        },]

    const values2 =  await getTypiCodeFetcher()
    console.log(values2)

    return (
        <>
            {values2.map(({userId, id, title, completed}, index) =>
                (<Component userId={userId} id={id} title={title} completed={completed} key = {index} />))}
        </>
    )
}