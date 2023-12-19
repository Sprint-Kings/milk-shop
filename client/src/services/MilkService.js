import { useHttp } from "../hooks/http.hook";

const useMilkService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'http://localhost:8083/api/';
    
    const getProducts = async (by) => {
        const res = await request(`${_apiBase}products/${by}`);
        return res.map(_transformProduct)
    }  

    const getProduct = async (id) => {
        const res = await request(`${_apiBase}product/${id}`);
        return _transformProduct(res)
    }

    const _transformProduct = (product) => {
        return {
            id: product.product_id,
            name: product.name,
            thumbnail: product.thumbnail,
            date: product.date,
            land: product.land,
            price: product.price,
            in_stock: product.in_stock,
            type: product.type,           
        }
    }

    const getAllTypes = async () => {
        const res = await request(`${_apiBase}types`);
        return res
    }  

    return {loading, error, getProducts, getProduct, 
       getAllTypes, clearError}
}

export default useMilkService;