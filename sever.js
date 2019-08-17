const app = require('./app')   // จะทำแบบนี้ได้ไฟล์ต้องอยู่เลเวลเดียวกัน แต่ถ้าอยู่เลเวลที่นอกออกไปให้ใช้ ../ชื่อไฟล์
const port =3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
