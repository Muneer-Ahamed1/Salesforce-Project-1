import axios from "axios"

const instance= axios.create({
baseURL:"https://salesforce-project-1-kvgq.vercel.app/",
withCredentials:true,
})

export default instance;

