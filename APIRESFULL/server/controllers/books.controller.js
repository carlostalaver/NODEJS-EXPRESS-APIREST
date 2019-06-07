const bookModel = require("../models/bookModel");

const bookCtrl = {};

bookCtrl.getBooks = async (req, res) => {
  const query = {}; // para realizar busquedas
  if (req.query.genre) {
    // si en parametro de consulta esta definido retorna los que cumplen, si no existe retorna todo
    query.genre = req.query.genre;
  }
  const bs = await bookModel.find(query, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return books;
  });
  res.json(bs);
};

bookCtrl.getBook = async (req, res) => {
  return await res.json(req.book);

  /*  sin el middleware
    const emp =   await bookModel.findById(req.params.id, (err, book) =>{
         if( err ) return err;     
          return book;          
     })
     res.json(emp) */
};

bookCtrl.createBook = async (req, res) => {
  const new_book = new bookModel(req.body);
  const emp_save = await new_book.save();
  res.status(201).json(new_book);
};

bookCtrl.editBookPut = async (req, res) => {
  const { id } = req.params;
  console.log('el body es ', req.body );
  
  const book_edit = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    read: req.body.read
  };
  const emp_ed = await bookModel.findByIdAndUpdate(
    id,
    { $set: book_edit },
    { new: true }
  );
  res.json(emp_ed);
};

bookCtrl.deleteBook = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json("Eliminado");
};

module.exports = bookCtrl;
