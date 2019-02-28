/**
 * A Panel for selecting designs
 */

import { PanelBody } from '@wordpress/components';

function DesignPanelBody( props ) {
	return (
		<PanelBody
			title={ <span>Design</span> }
			className="ahg-design-panel-body"
			{ ...props }
		>
			{ props.children }
		</PanelBody>
	);
}

export default DesignPanelBody;
