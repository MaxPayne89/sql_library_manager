'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The book must have a title!"
        },
        notEmpty: {
          msg: "The book must have a Title!"
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "The book must have an author!"
        },
        notEmpty: {
          msg: "The book must have an author!"
        }
      }
    },
    genre: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.INTEGER
    }
  }, { sequelize });

  return Book;
};
