'use strict'

import mongoose from 'mongoose';
const { Schema } = mongoose;
import { connectionString } from "../lib/credentials.js";

// remote db connection settings. For security, connectionString should be in a separate file not committed to git

mongoose.connect(connectionString, {
    dbName: 'sccprojects',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define Book model in JSON key/value pairs
// values indicate the data type of each key
const bookSchema = new Schema({
 title: { type: String, required: true },
 author: String,
 count: Number,
 pubdate: Date,
 inStore: Boolean
});

export const Book = mongoose.model('Book', bookSchema);
