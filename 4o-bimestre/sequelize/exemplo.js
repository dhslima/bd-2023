const {Sequelize , DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    'testesequelize',
    'root',
    'admin',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

User.hasMany()
// M-N com atributos

sequelize.sync().then(() => {
    return User.create({firstName: "David", lastName: "Lima"});
}).then((u) => {console.log(u.toJSON())});
    


    
