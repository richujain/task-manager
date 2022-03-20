require('../src/db/mongoose')
const User = require('../src/models/user')
// 623345b66bff1e3d83daeb5d

// User.findByIdAndUpdate('62349c35e195363538ca8d1b', {age : 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age : 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('62349c35e195363538ca8d1b', 11).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})