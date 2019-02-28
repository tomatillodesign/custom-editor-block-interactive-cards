// Specify a function to execute when the DOM is fully loaded.
const domReady = function( callback ) {
	if (
		document.readyState === 'complete' || // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.
		document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.
	) {
		return callback();
	}
	// DOMContentLoaded has not fired yet, delay callback until then.
	document.addEventListener( 'DOMContentLoaded', callback );
};

domReady( () => {
	const elems = document.querySelectorAll( '.ahg-card' );
	elems.forEach( el => {
		const btn = el.querySelector( '.ahg-card__toggle' );
		const clickHandler = e => {
			el.classList.toggle( 'ahg-card--more' );
			const isExpanded = el.classList.contains( 'ahg-card--more' );
			btn.setAttribute( 'aria-expanded', isExpanded ? 'true' : 'false' );
			e.preventDefault();
		};
		if ( btn ) {
			btn.addEventListener( 'click', clickHandler );
			btn.addEventListener( 'tapEnd', clickHandler );
		}
	} );
} );
