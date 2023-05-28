import multer from 'multer'

export const storage = (path) => {
    const postStorage=multer.diskStorage(
        {
            destination: (req, file, callback) => {
                callback(null, path)
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname)

            }
        }
    )
    return postStorage


}