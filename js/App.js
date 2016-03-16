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

window.ee = new EventEmitter();

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
				<a href="#" onClick={()=>{this.readmoreClick()}} className={'news__readmore ' + (visible ? 'none': '')}>Подробнее</a>
				<p className={"big__text " + (visible ? '': 'none')}>{bigText}</p>
			</div>
		);
	}
	readmoreClick(){
		this.setState({visible: true});
	}
}

Article.propTypes = {
	data: React.PropTypes.shape({
		author: React.PropTypes.string.isRequired,
		text: React.PropTypes.string.isRequired,
		bigText: React.PropTypes.string.isRequired
	})
};

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
News.propTypes = {data: React.PropTypes.array.isRequired};

class Comments extends React.Component {
	render(){
		return (
			<div className="comments">
				Нет новостей - комментировать нечего
			</div>
		);
	}
}

class Add extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			agreeNotChecked: true,
			authorIsEmpty: true,
			textIsEmpty: true
		};
	}
	onFieldChange(fieldName, e){
		if(e.target.value.trim().length > 0){
			this.setState({[''+fieldName]: false});
		} else {
			this.setState({[''+fieldName]: true});
		}
	}
	componentDidMount(){
		ReactDOM.findDOMNode(this.refs.author).focus();
	}
	onBtnClickHandler(e){
		e.preventDefault();
		let author = ReactDOM.findDOMNode(this.refs.author).value;
		let text = ReactDOM.findDOMNode(this.refs.text).value;
		let item = [{
			author: author,
			text: text,
			bigText: '...'
		}];

		window.ee.emit('News add', item);
		this.refs.author.value = '';
		this.refs.text.value = '';
		this.refs.checkrule.checked = false;
		this.setState({textIsEmpty: true, agreeNotChecked: true, authorIsEmpty: true});
	}
	onCheckRuleClick(){
		this.setState({agreeNotChecked: !this.state.agreeNotChecked});
	}
	render(){
		let agreeNotChecked = this.state.agreeNotChecked;
		let authorIsEmpty = this.state.authorIsEmpty;
		let textIsEmpty = this.state.textIsEmpty;

		return (
			<form className="add cf">
				<input
					type="text"
					className="add__author"
					defaultValue=""
					placeholder="Ваше имя"
					ref="author"
					onChange={(e)=>{this.onFieldChange('authorIsEmpty', e)}}
					/>
				<textarea
					className="add__text"
					defaultValue=""
					placeholder="Текст новости"
					ref="text"
					onChange={(e)=>{this.onFieldChange('textIsEmpty', e)}}
					></textarea>
				<label className="add__checkrule">
					<input type="checkbox" ref="checkrule" onChange={()=>{this.onCheckRuleClick()}}/> Я согласен с чем-то
				</label>
				<button
					className="add__btn"
					onClick={(e) => {this.onBtnClickHandler(e)}}
					ref="alert_button"
					disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
					Добавить новость
				</button>
			</form>
		);
	}
}

class App extends React.Component {
	constructor(props){
		super();
		this.state = {news: my_news};
	}
	componentDidMount(){
		window.ee.addListener('News add', (item)=>{
			let newNews = item.concat(this.state.news);
			this.setState({news: newNews});
		});
	}
	componentWillUnmount(){
		window.ee.removeListener('News add');
	}
	render(){
		return (
			<div className="app">
				<Add />
				<h3>Нововсти:</h3>
				<News data={this.state.news}/> {/* свойство data added */}
				<Comments />
			</div>
		);
	}
}





ReactDOM.render(<App/>, document.getElementById('root'));