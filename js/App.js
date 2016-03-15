let my_news = [
	{
		author: 'Author 1',
		text:'sdfsdfsdfsdf',
		bigText:'jkhjkh khjkhh  jkhkh  jkhjk  hjkdfsdf'
	},
	{
		author: 'Author 2',
		text:'2sdfsdfsdfsdf',
		bigText:'jkhjkh khjkhh  jkhkh  jkhjk  hjkdfsdf'
	},
	{
		author: 'Author 3',
		text:'3sdfsdfsdfsdf',
		bigText:'jkhjkh khjkhh  jkhkh  jkhjk  hjkdfsdf'
	},
	{
		author: 'Author 4',
		text:'4sdfsdfsdfsdf',
		bigText:'jkhjkh khjkhh  jkhkh  jkhjk  hjkdfsdf'
	}
];

class Article extends React.Component {
	constructor(props){
		super();
		this.state = { visible: false };
	}
	render(){
		let author = this.props.data.author;
		let text = this.props.data.text;
		let bigText = this.props.data.bigText;
		let visible = this.state.visible;
		return (
			<div className="article">
				<p className="news__author">{author}:</p>
				<p className="news__text">{text}</p>
				<a href="#" onClick={()=>{this.readmoreClick()}}className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
				<p className={"big__text " + (visible ? '': 'none')}>{bigText}</p>
			</div>
		);
	}
	readmoreClick(){
		this.setState({visible: true});
	}
}
class News extends React.Component {
	constructor(props){
		super();
		this.state = {counter: 0}
	}
	onTotalNewsClick(){
		this.setState({counter: ++this.state.counter});
	}
	render() {
		let data = this.props.data;
		let newsTemplate;
		if (data.length > 0){
			newsTemplate = data.map((item, index)=>{
				return (
					<div key={index}>
						<Article data={item}/>
					</div>
				);
			});
		} else {
			newsTemplate = <p>К сожалению, новостей нет</p>
		}

		return (
			<div className="news">
				<span className={'news__count' + (data.length > 0 ? '' : 'none') } onClick={()=>{this.onTotalNewsClick()}}>Всего новостей : {data.length}</span>
				{newsTemplate}
			</div>
		);
	}
}

News.propTypes = {
	data: React.PropTypes.shape({
		author: React.PropTypes.string.isRequired,
		text: React.PropTypes.string.isRequired,
		bigText: React.PropTypes.string.isRequired
	})
};

class Comments extends React.Component {
	render(){
		return (
			<div className="comments">
				Нет новостей - комментировать нечего
			</div>
		);
	}
}

class App extends React.Component {
	render(){
		return (
			<div className="app">
				<h3>Нововсти:</h3>
				<News data={my_news}/> {/* свойство data added */}
				<Comments />
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('root'));