import map from '../../img/map.png'

const ContactsPage = () => {
    return (
        <div style={{minheight: '80vh'}}>
            <h1>Контакты</h1>
            <img src={map} alt='map' style={{width: '100%'}}></img>
            <h3>Телефон: 9-999-999-99-99</h3>
            <h3>email: sssss@googl.com</h3>
            <h3>Адрес: г.Владимир ул.Хорошая д.1</h3>
        </div>
    )
}

export default ContactsPage;