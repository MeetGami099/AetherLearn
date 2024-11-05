import { deletePost } from "../services/operation/post";
import { openEdit } from "../Pages/UploadPost/UploadPost";

export const videoOption =[
    {
        name:"Edit",
        function:""
    },
    {
        name:"Delete",
        function:deletePost,
    },
];

export const postOption =[
    {
        name:"Edit",
        function:openEdit
    },
    {
        name:"Delete",
        function:deletePost,
    }
];
