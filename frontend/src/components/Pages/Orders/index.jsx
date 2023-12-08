import React, { useState } from 'react';
import'./styles.css'
import NavBarPrincipal from '../../NavBarPrincipal/NavBarPrincipal';
import SideBar from '../../SideBar/SideBar';
import fondo2 from '../../../assets/img/fondo2.jpg';


function Orders() {

    const [products, setProducts] = useState([]);

    const addProduct = (e) => {
        e.preventDefault();
        const productName = e.target.productName.value;
        const category = e.target.category.value;
        const quantity = e.target.quantity.value;
        const unit = e.target.unit.value;
        const date = e.target.date.value;
        const week = e.target.week.value;
        const quantityReceived = e.target.quantityReceived.value;

        const newProduct = { productName, category, quantity, quantityReceived, unit, date, week };
        setProducts([...products, newProduct]);
    };

  return (
    <div>
        <img className='fondo' src={fondo2} alt='fondo'></img>

<NavBarPrincipal></NavBarPrincipal>

<header className="header3">
	
	<div className="text-box">
    <div className="loader2">
		<h1 className="heading-primary2">Pedidos</h1>
			<span className="heading-primary-sub4">Algo tengo que poner aquí</span>
		{/* <img className='Pedidos' src={Pedidos} alt="Pedidos" /> */}
	</div>
  </div>
  
</header>

<div className="form-container">
        <h2>Pedido de Productos</h2>
        <form className="productForm" onSubmit={addProduct}>
            <label for="productName">Nombre del Producto</label>
            <input type="text" id="productName" className="productName" required/>

            <label for="category">Categoria</label>
            <select id="category" className="Category">
                <option value="lacteos">Lácteos</option>
                <option value="No-Perecederos">No Perecedero</option>
                <option value="Vegetales">Vegetales</option>
                <option value="Frutas">Frutas</option>
                <option value="Carnes">Carnes</option>
                <option value="Pescado">Pescado</option>
            </select>

            <label for="quantity">Cantidad Pedida</label>
            <input type="number" id="quantity" className="quantity" required min={1}/>

            <label for="quantity">Cantidad Recibida</label>
            <input type="number" id="quantityReceived" className="quantity" required min={1}/>

            <label for="unit">Unidad de Medida</label>
            <select id="unit" className="unit">
                <option value="kg">Kilogramos</option>
                <option value="g">Gramos</option>
                <option value="l">Litros</option>
                <option value="ml">Mililitros</option>
                <option value="latas">Latas</option>
                <option value="Unidades">Unidades</option>
                <option value="Paquetes">Paquetes</option>
                <option value="Rollos">Rollos</option>
                <option value="Galón">Galón</option>

            </select>

            <label for="date">Fecha</label>
            <input type="date" id="date" className="date" required/>

            <label for="week">Semana</label>
            <select id="week" className="week">
                <option value="semana #1">Semana #1</option>
                <option value="semana #2">Semana #2</option>
                <option value="semana #3">Semana #3</option>
                <option value="semana #4">Semana #4</option>
              
            </select>

            <input type="submit" value="Agregar al Inventario"/>
        </form>

        <div className="result-container">
            <h2>Inventario</h2>
            <table className="inventoryTable">
                <thead>
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Categoría</th>
                        <th>Cantidad solicitada</th>
                        <th>Cantidad recibida</th>
                        <th>Unidad de Medida</th>
                        <th>Fecha</th>
                        <th>Día de la Semana</th>
                    </tr>
                    </thead>
                    <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>{product.quantityReceived}</td>
                      <td>{product.unit}</td>
                      <td>{product.date}</td>
                      <td>{product.week}</td>
                      
                    </tr>
                  ))}
                </tbody>
                      </table>
</div>                  
</div>

<div>
  <SideBar></SideBar>
</div>
    </div>
  )
}

export default Orders