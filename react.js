'use strict';

class App extends React.Component {
	

	state = {
		temp: []
	}

	
	 
	componentDidMount() {
	fetch('https://mi-linux.wlv.ac.uk/~2062063/ciproject/public/index.php/project/index')
		.then(res => res.json())
		.then((data) => {
		  this.setState({ temp: data.data}) 
		})
		.catch(console.log)
	}
	
	

	
	render() {
	console.log(this.state.temp);
		return (
			
			<div>
	
			
			<ul>
			{this.state.temp.map((item,index)=>
			<li>
{item.name} || {item.data} 
			
				
			</li>

			
						)}
			</ul>
			</div>
		);
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);