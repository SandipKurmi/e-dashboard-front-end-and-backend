import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateProduct = () => {

    const [name, setName] = useState("")
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        // console.log(params);
        let result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        const data = result
        // console.log(data)
        setName(data.name)
        setPrice(data.price)
        setCategory(data.category)
        setCompany(data.company)
    }

    const updateProduct = async () => {
        // console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/api/product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))

            }

        })
        result = await result.json();
        // console.log(result)
        navigate("/")

    }

    return (
        <div className="product">
            <h1>Update Products</h1>
            <input className="inputBox" type="text" placeholder="Enter Product name" onChange={(e) => setName(e.target.value)} value={name} />
            <input className="inputBox" type="text" placeholder="Enter Product price" onChange={(e) => setPrice(e.target.value)} value={price} />
            <input className="inputBox" type="text" placeholder="Enter Product category" onChange={(e) => setCategory(e.target.value)} value={category} />
            <input className="inputBox" type="text" placeholder="Enter Product company" onChange={(e) => setCompany(e.target.value)} value={company} />
            <button onClick={updateProduct} className="appButton">Update Product </button>
        </div>
    )
}

export default UpdateProduct