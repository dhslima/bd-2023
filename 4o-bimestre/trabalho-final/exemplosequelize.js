// npm install mysql2 sequelize

const { Sequelize, DataTypes } = require('sequelize');

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(
    'seu_banco',
    'seu_usuario',
    'sua_senha',
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

// Definição do modelo User com chave primária explícita
const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Definição do modelo Address com relacionamento 1-1
const Address = sequelize.define('Address', {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Address); // Relacionamento 1-1: Um usuário tem um endereço
Address.belongsTo(User);

// Definição do modelo Project com relacionamento 1-N e atributos
const Project = sequelize.define('Project', {
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true, // O atributo 'role' é opcional
  },
});

User.hasMany(Project); // Relacionamento 1-N: Um usuário pode ter muitos projetos
Project.belongsTo(User);

// Definição do modelo Course com relacionamento N-M e atributos
const Course = sequelize.define('Course', {
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const UserCourse = sequelize.define('UserCourse', {
  // Atributo específico do relacionamento N-M
  progress: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

User.belongsToMany(Course, { through: UserCourse }); // Relacionamento N-M: Um usuário pode ter muitos cursos
Course.belongsToMany(User, { through: UserCourse });

// Sincronizando os modelos com o banco de dados
sequelize.sync({ force: true }).then(async () => {
  // Criando um usuário com endereço, projetos e cursos
  const user1 = await User.create({
    name: 'David Lima',
    Address: { street: 'Rua nova' },
    Projects: [
      { projectName: 'Projeto 1', role: 'Dev' },
      { projectName: 'Projeto 2', role: 'PO' },
    ],
    Courses: [
      { courseName: 'Curso 1', grade: 90 },
      { courseName: 'Curso 2', grade: 85 },
    ],
  }, {
    include: [Address, Project, Course], // Incluindo os relacionamentos ao criar o usuário
  });

  // Consultando o usuário com seus relacionamentos
  const userWithRelations = await User.findByPk(user1.userId, {
    include: [Address, Project, Course],
  });

  console.log(JSON.stringify(userWithRelations, null, 2));

  // Fechando a conexão com o banco de dados
  await sequelize.close();
});