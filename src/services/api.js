import axios from 'axios';   

const api = axios.create({
    baseURL:'http://www.poatransporte.com.br/php/facades/process.php'  //baseURL para importação de dados
});

export default api;