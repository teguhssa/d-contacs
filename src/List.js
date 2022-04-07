const List = ({ data, handleEdit, handleDelete }) => {
    return ( 
        <div className='list-group mt-10'>
            {
                data.map((contact) => {
                    return (
                        <div className='list-group-item list-group-item-action' key={contact.id}>
                            <div className='d-flex justify-content-between'>
                                <h5 className='mb-1'>{contact.name}</h5>
                                <div>
                                    <button onClick = {() => handleEdit(contact.id)} className='btn btn-sm btn-link'>Edit</button>
                                    <button onClick = {() => handleDelete(contact.id)} className='btn btn-sm btn-link'>Hapus</button>
                                </div>
                            </div>
                            <p className='mb-1'>{contact.telp}</p>
                        </div>
                    )
                })
            }
      </div>
     );
}
 
export default List;