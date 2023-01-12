export interface user{
    name:string,
    email:string,
    phone:number,
    profilePic:string,
    password:string,
}

export interface post{
    txt:string,
    image?:string,
    createdAt:string,
    lastEdited?:string,
    user:string,
}