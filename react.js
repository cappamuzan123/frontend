'use strict';
//form copied from https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react
class App extends React.Component {
	

	constructor(props) {
    super(props);
    this.state = {name: '',
							phone:'',
							people:'',
							hotel_name:'',
							hotel:[]
					};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleDelete = this.handleDelete.bind(this);
  }

//to change he file profile 
			  handleChange(event) {
				const target = event.target;
				const value = target.value;
				const name = target.name;

				this.setState({
				  [name]: value
				});
			  }
			  
			 // to delete handle
			handleDelete(event) {
			let id=event.target.id;		
			const recipeUrl = 'https://mi-linux.wlv.ac.uk/~2062063/ciproject/public/index.php/project/cancel/'+ id;
			const requestMetadata = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			};
			fetch(recipeUrl, requestMetadata)
				.then(res => res.json())
				.then(recipes => {
					console.log(recipes);
			
					
				  });
				  
				  
			//	  refresh data packages 
	  	fetch('https://mi-linux.wlv.ac.uk/~2062063/ciproject/public/index.php/project/index')
		.then(res => res.json())
		.then((data) => {
		  this.setState({ hotel: data.data}) 
		})
		.catch(console.log)
				
		  }


//save into database file name 
  handleSubmit(event) {
	console.log(this.state);
    event.preventDefault();
	
	let mydata = this.state;

    let formData = new FormData();
    formData.append("name", mydata.name);
    formData.append("phone", mydata.phone);
    formData.append("people", mydata.people);
	 formData.append("hotel", mydata.hotel_name);

    fetch('https://mi-linux.wlv.ac.uk/~2062063/ciproject/public/index.php/project/save',
	{
      method: "POST",
      body: formData,
    });
	//refresh data component
	fetch('https://mi-linux.wlv.ac.uk/~2062063/ciproject/public/index.php/project/index')
		.then(res => res.json())
		.then((data) => {
		  this.setState({ hotel: data.data}) 
		})
		.catch(console.log)
	  
	
  }

	
	 //to input the data
	componentDidMount() {
	fetch('https://mi-linux.wlv.ac.uk/~2062063/ciproject/public/index.php/project/index')
		.then(res => res.json())
		.then((data) => {
		  this.setState({ hotel: data.data}) 
		})
		.catch(console.log)
	}
	
	
// to render to component file
	
	render() {
	console.log(this.state.hotel);
		return (
			
	  <div>
 
        
        <div class="container">
		<h1>uni project  Hotel booking</h1>

<div className="wrapper row">
   
<form onSubmit={this.handleSubmit} method="post">
      <fieldset>
    
        <input  class="form-control" type="text" value={this.state.value} onChange={this.handleChange}  name="name"  placeholder="enter name"/>
         </fieldset>
		 
	       <fieldset>
        <input  class="form-control" type="text" value={this.state.value} onChange={this.handleChange} name="phone" placeholder="enter phone"/>     
	  
       </fieldset>
	   
	       <fieldset>
    
        <input  class="form-control" type="text" value={this.state.value} onChange={this.handleChange} name="people" placeholder="how many people" />
   
       </fieldset>
	   
	   
	   
	      <fieldset>
         <label>
         <select  class="form-control" value={this.state.value}  onChange={this.handleChange} name="hotel_name">
            <option value="london">London  Hotel</option>
            <option value="wolverhampton">wolves home</option>
            <option value="holiday">Holiday inn</option>
            <option value="hotel wlv">wlv hotel</option>
          </select>
         </label>
       </fieldset>
   <button type="submit" class="btn btn-primary mb-2">Submit</button>
      </form>
    </div>		
	
          {this.state.hotel.map((item, index) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{item.name} </h5>
                <h6 class="card-subtitle mb-2 text-muted">  {item.hotel} </h6>
                <p class="card-text">
                Phone     :    {item.phone}
                </p>
				    <p class="card-text">
             	
			number of people      : {item.people}  
                </p>
            
                 <button type="button" className="btn btn-outline-danger" id={item.id} 
					onClick={this.handleDelete}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);