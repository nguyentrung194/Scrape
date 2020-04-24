import Header from './Header';

const layoutStyle = {
  marginTop: 10,
  marginBottom: 20,
  padding: 20,
  border: '1px solid #DDD'
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.titleResult.map((el)=>{
      <div>
        <h3>{el.titleResult}</h3>
      </div>
    })}
    {props.companyResult.map((el)=>{
      <div>
        <p>{el.companyResult}</p>
      </div>
    })}
    {props.summaryResult.map((el)=>{
      <div>
        <p>{el.summaryResult}</p>
      </div>
    })}
    {props.addressResult.map((el)=>{
      <div>
        <p>{el.addressResult}</p>
      </div>
    })}
  </div>
);

export default Layout;