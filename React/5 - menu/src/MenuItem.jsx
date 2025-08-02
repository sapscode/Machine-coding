const MenuItem = ({ title, category, price, img, desc }) => {
	return (
		<div className="menu-item">
			<img className="img" src={img} alt={title} />
			<div className="item-info">
				<header>
					<h5>{title}</h5>
					<div className="item-price">{price}</div>
				</header>
				<p className="item-text">{desc}</p>
			</div>
		</div>
	);
};
export default MenuItem;
