import './Table.css'
import yelp from './Yelp.png'


export default function Table({data, setShowTable1, setShowCard1, setBusinessID, table_headers}){  
        

    const TableRow=({item,column,index}) =>(
        <tr style={{cursor:"pointer"}} onClick={() => { setShowTable1(false); setShowCard1(true); setBusinessID(item.id); }}>
            {
                column.map((columnItem, i) => {
                // console.log("in table "+columnItem.heading);
                if(columnItem.heading==='#'){
                    return <td style={{ fontWeight: 'bold'}} key={columnItem.value.toString()+index.toString()}>{index}</td>
                }
                if(columnItem.heading==='Images'){
                    if(item[`${columnItem.value}`]===""){
                        item[`${columnItem.value}`]=yelp;
                    }
                    return <td  key={item[`${columnItem.value}`].toString()}><img src={item[`${columnItem.value}`]} alt="business_image" className='table_images' /></td>
                }
                if(columnItem.heading==='Business Name'){
                    
                    return <td key={item[`${columnItem.value}`].toString()}>{item[`${columnItem.value}`]}</td>
                }
                if(columnItem.heading==='Distance (miles)')
                    return <td key ={item[`${columnItem.value}`].toString()}>{parseInt((item[`${columnItem.value}`])/1609.34)}</td>

                return <td key={item[`${columnItem.value}`].toString()}>{item[`${columnItem.value}`]}</td>
            })}
        </tr>

    );


const TableHeaders= ({item}) =><th key={item.heading.toString()}>{item.heading}</th>


    if(data.length!==0){
    return(      
        <>
        {/* buss_table */}
        <div className='mx-auto container table_font' key="addingdivtotable">
        <table className="table mx-auto table-striped business_table_style text-center"  key="addingtabletotable">
            <thead key="addingtheadtotable">
              <tr  key="addingheader">
                {table_headers.map((item,index)=> <TableHeaders key={item.heading.toString()} item={item}/>)}
              </tr>
            </thead>
            <tbody key="addingtbodytoheader">
            {  data.map((item, index) => {return(<TableRow key={item.id.toString()} item={item} index={index+1} column={table_headers} />)} )}
            </tbody>

        </table>
        </div>
        
       {console.log(data.length+"in if")}
        </>
        )
    }
    else {
        console.log(data.length)
        return(
            <></>
        )
         
        
    }
    };
