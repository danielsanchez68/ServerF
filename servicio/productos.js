//import ModelMem from '../model/DAO/productosMem.js'
//import ModelFile from '../model/DAO/productosFile.js'
import ModelFactory from '../model/DAO/productosFactoy.js'

import { validar } from '../validaciones/productos.js'

import config from '../config.js'


class Servicio {

    constructor() {
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    obtenerProductos = async id => {
        const productos = await this.model.obtenerProductos(id)
        return productos
    }

    guardarProducto = async producto => {
        const res = validar(producto)
        if(res.result) {
            const productoGuardado = await this.model.guardarProducto(producto)
            return productoGuardado
        }
        else {
            //console.log(res.error)
            throw res.error
        }
    }

    actualizarProducto = async (id, producto) => {
        const productoActualizado = await this.model.actualizarProducto(id,producto)
        return productoActualizado
    }

    borrarProducto = async id => {
        const productoBorrado = await this.model.borrarProducto(id)
        return productoBorrado
    }
}

export default Servicio