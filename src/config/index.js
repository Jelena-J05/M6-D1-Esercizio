import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

export default multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "Epicode",
    },
  }),
}).single("avatar")

          
cloudinary.config({ 
  cloud_name: 'dzvbmdvzd', 
  api_key: '748874198823242', 
  api_secret: 'ebZ62yxmHOYNzTdST6gAp86UVcA' 
});