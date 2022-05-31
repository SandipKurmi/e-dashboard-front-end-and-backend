import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const ProductList = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/api/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json()
        setProducts(result)
    }

    const deleteProduct = async (id) => {
        // console.log(id);
        let result = await fetch(`http://localhost:5000/api/product/${id}`, {
            method: "Delete",
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })

        result = await result.json()
        // console.log(result)
        if (result) {
            alert('record is delete')
            getProducts()
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/api/search/${key}`, {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json()
            // console.log(result)
            let data = result
            if (data) {
                setProducts(data)
            }
        } else {
            getProducts()
        }

    }


    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input className="search-product-box" type="text" placeholder="Search" onChange={searchHandle} />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Opration</li>


            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}  >Delete</button>
                            <Link className="updateButton" to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )

                    : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList