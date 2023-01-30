const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    if (blogs.lenght === 0) {
      return 0
    } else{
      return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    }
  }

  const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((most, next) => {
      if (most.likes < next.likes){
        return most = next
      }
      return most
    })

    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    }
  }

  const mostBlogs = (blogs) => {
    const authors = lodash.countBy(blogs, 'author')
    console.log(authors)
    console.log(typeof authors)

    const wroteTheMost = Object.keys(authors).reduce((most, next) => {
      if(authors[most] < authors[next]){
        return most = next
      }
      return authors[most]
    })
    return {
      author: wroteTheMost,
      blogs: authors[wroteTheMost]
    }
  }

  const mostLikes = (blogs) => {
    const authors = lodash(blogs).groupBy('author').map((obj, name) => ({
      author: name,
      likes: lodash.sumBy(obj, 'likes')
    })).value()
    console.log(authors)

    return authors.reduce((most, next) => {
      if (most.likes < next.likes){
        return most = next
      }
      return most
    })
  }


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }