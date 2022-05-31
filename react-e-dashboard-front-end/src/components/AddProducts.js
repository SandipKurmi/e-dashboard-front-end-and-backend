import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProducts = () => {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)



    const addProduct = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            return false
        }

        // console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id  //it convert string into json 
        console.log(userId._id)
        let result = await fetch("http://localhost:5000/api/product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))

            }
        })
        result = await result.json()
        // console.log(result)
        navigate('/')
    }

    return (
        <div className="product">
            <h1>Add Products</h1>
            <input className="inputBox" type="text" placeholder="Enter Product name" onChange={(e) => setName(e.target.value)} value={name} />
            {error && !name && <span className='invalid-input'>Enter valid Name</span>}
            <input className="inputBox" type="text" placeholder="Enter Product price" onChange={(e) => setPrice(e.target.value)} value={price} />
            {error && !price && <span className='invalid-input'>Enter valid Price</span>}
            <input className="inputBox" type="text" placeholder="Enter Product category" onChange={(e) => setCategory(e.target.value)} value={category} />
            {error && !company && <span className='invalid-input'>Enter valid Company</span>}
            <input className="inputBox" type="text" placeholder="Enter Product company" onChange={(e) => setCompany(e.target.value)} value={company} />
            {error && !category && <span className='invalid-input'>Enter valid Category</span>}
            <button onClick={addProduct} className="appButton">Add Product</button>
        </div>
    )
}

export default AddProducts