/**
 * BLOCK: ahg-guten
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import classnames from 'classnames';
import { ImageUploadPlaceholder, DesignPanelBody } from '../components';

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
} = wp.editor;

const { Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { RangeControl, SelectControl } = wp.components;
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-ahg-guten', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Staff Member' ), // Block title.
	icon: {
		foreground: '#fff',
		background: '#8E2DE2',
		src: 'admin-users',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ __( 'card' ), __( 'staff-member' ), __( 'team-member' ) ],
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: '.ahg-card__image-container',
			attribute: 'data-src',
		},
		heading: {
			source: 'html',
			selector: '.ahg-card__title',
			default: __( 'Name' ),
		},
		tagline: {
			source: 'html',
			selector: '.ahg-card__tagline',
			default: __( 'Subtitle for this block' ),
		},
		des: {
			source: 'html',
			selector: '.ahg-card__less-des',
			default: '',
		},
		moreDes: {
			source: 'html',
			selector: '.ahg-card__more-des',
			multiline: 'p',
			default: '',
		},
		moreLabel: {
			source: 'html',
			selector: '.ahg-card__more-toggle-des',
			default: __( 'Show more' ),
		},
		lessLabel: {
			source: 'html',
			selector: '.ahg-card__less-toggle-des',
			default: __( 'Show less' ),
		},
		headingColor: {
			type: 'string',
		},
		taglineColor: {
			type: 'string',
		},
		desColor: {
			type: 'string',
		},
		shapes: {
			type: 'string',
			default: 'circle',
		},
		contentAlign: {
			type: 'string',
			default: 'none',
		},
		// Design related Attributes
		design: {
			type: 'string',
			default: 'basic',
		},
		backgroundColor: {
			type: 'string',
			default: '#FFF',
		},
		borderRadius: {
			type: 'number',
			default: 12,
		},
		shadow: {
			type: 'number',
			default: 3,
		},
	},

	edit: function( props ) {
		const { isSelected, className, setAttributes, attributes } = props;

		const {
			heading,
			tagline,
			des,
			moreDes,
			moreLabel,
			lessLabel,
			mediaID,
			mediaURL,
			headingColor,
			taglineColor,
			desColor,
			design = 'basic',
			shapes,
			contentAlign,
			backgroundColor,
			borderRadius = 12,
			shadow = 3,
		} = attributes;

		const mainClasses = classnames( [ className, 'ahg-card' ], {
			[ `ahg--shadow-${ shadow }` ]: shadow !== 3,
		} );

		const mainStyles = {
			borderRadius:
				design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
			backgroundColor: design !== 'plain' ? backgroundColor : undefined,
		};

		const imageClasses = classnames( [
			'ahg-card__image-container',
			`ahg-card--image-${ shapes }`,
		] );

		const shape = [
			{ value: 'square', label: __( 'Square' ) },
			{ value: 'circle', label: __( 'Circle' ) },
		];

		const onChangeAlignment = newAlignment => {
			setAttributes( {
				contentAlign: newAlignment === undefined ? 'none' : newAlignment,
			} );
		};

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar value={ contentAlign } onChange={ onChangeAlignment } />
				</BlockControls>
				<InspectorControls>
					<DesignPanelBody>
						<RangeControl
							label={ __( 'Border Radius' ) }
							value={ borderRadius }
							onChange={ borderRadius => setAttributes( { borderRadius } ) }
							min={ 0 }
							max={ 50 }
						/>
						<RangeControl
							label={ __( 'Shadow / Outline' ) }
							value={ shadow }
							onChange={ shadow => setAttributes( { shadow } ) }
							min={ 0 }
							max={ 9 }
						/>
						<SelectControl
							label={ __( 'Image Shape' ) }
							value={ shapes }
							options={ shape.map( ( { value, label } ) => ( {
								value: value,
								label: label,
							} ) ) }
							onChange={ newShape => {
								setAttributes( { shapes: newShape } );
							} }
						/>
					</DesignPanelBody>
					<PanelColorSettings
						title={ __( 'Title Colors' ) }
						colorSettings={ [
							{
								value: headingColor,
								onChange: colorValue =>
									setAttributes( { headingColor: colorValue } ),
								label: __( 'Heading Color' ),
							},
							{
								value: taglineColor,
								onChange: colorValue =>
									setAttributes( { taglineColor: colorValue } ),
								label: __( 'Tagline Color' ),
							},
							{
								value: desColor,
								onChange: colorValue => setAttributes( { desColor: colorValue } ),
								label: __( 'Description Color' ),
							},
						] }
					/>
				</InspectorControls>
				<div className={ mainClasses } style={ mainStyles } aria-expanded="false">
					{ isSelected ? (
						<Fragment>
							<ImageUploadPlaceholder
								className={ imageClasses }
								imageID={ mediaID }
								imageURL={ mediaURL }
								onRemove={ () => setAttributes( { mediaURL: '', mediaID: '' } ) }
								onChange={ ( { url, id } ) =>
									setAttributes( { mediaURL: url, mediaID: id } )
								}
							/>
							<RichText
								tagName="h4"
								placeholder={ __( 'Name' ) }
								className="ahg-card__title"
								onChange={ text => setAttributes( { heading: text } ) }
								style={ {
									color: headingColor,
									textAlign: contentAlign,
								} }
								value={ heading }
								keepPlaceholderOnFocus
							/>
							<RichText
								tagName="p"
								value={ tagline }
								className="ahg-card__tagline"
								onChange={ text => setAttributes( { tagline: text } ) }
								style={ {
									color: taglineColor,
									textAlign: contentAlign,
								} }
								placeholder={ __( 'Subtitle for this block' ) }
								keepPlaceholderOnFocus
							/>
							<RichText
								tagName="p"
								value={ des }
								className="ahg-card__less-des"
								onChange={ text => setAttributes( { des: text } ) }
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								style={ {
									color: desColor,
									textAlign: contentAlign,
								} }
								placeholder={ __(
									'Short description that can be expanded to show more details or links.'
								) }
								keepPlaceholderOnFocus
							/>
							<a>
								<RichText
									tagName="div"
									value={ moreLabel }
									onChange={ text => setAttributes( { moreLabel: text } ) }
									formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
									className="ahg-expand__more-toggle-des"
									style={ { textAlign: contentAlign } }
									placeholder={ __( 'View more button' ) }
									keepPlaceholderOnFocus
								/>
							</a>
							<RichText
								multiline="p"
								value={ moreDes }
								onChange={ text => setAttributes( { moreDes: text } ) }
								style={ {
									color: desColor,
									textAlign: contentAlign,
								} }
								className="ahg-expand__more-des"
								placeholder={ __(
									'Longer description that will be expanded and show more details or links.'
								) }
								keepPlaceholderOnFocus
							/>
							<a>
								<RichText
									tagName="div"
									value={ lessLabel }
									onChange={ text => setAttributes( { lessLabel: text } ) }
									formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
									className="ahg-expand__less-toggle-text"
									style={ { textAlign: contentAlign } }
									placeholder={ __( 'View less button' ) }
									keepPlaceholderOnFocus
								/>
							</a>
						</Fragment>
					) : (
						<div className="static-staff-member">
							<p>Staff Member: { heading }</p>
						</div>
					) }
				</div>
			</Fragment>
		);
	},

	save: function( props ) {
		const { isSelected, className, setAttributes, attributes } = props;

		const {
			heading,
			tagline,
			des,
			moreDes,
			moreLabel,
			lessLabel,
			mediaID,
			mediaURL,
			headingColor,
			taglineColor,
			desColor,
			design = 'basic',
			shapes,
			contentAlign,
			backgroundColor,
			borderRadius = 12,
			shadow = 3,
		} = attributes;

		const mainClasses = classnames( [ className, 'ahg-card' ], {
			[ `ahg--shadow-${ shadow }` ]: shadow !== 3,
		} );

		const mainStyles = {
			borderRadius:
				design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
			backgroundColor: design !== 'plain' ? backgroundColor : undefined,
		};
		const imageClasses = classnames( [
			'ahg-card__image-container',
			`ahg-card--image-${ shapes }`,
		] );
		return (
			<div className={ mainClasses } style={ mainStyles } aria-expanded="false">
				{ mediaURL && (
					<div
						className={ imageClasses }
						style={ {
							backgroundImage: `url(${ mediaURL })`,
							textAlign: contentAlign,
						} }
						data-src={ mediaURL }
					/>
				) }
				{ ! RichText.isEmpty( heading ) && (
					<RichText.Content
						tagName="h4"
						className="ahg-card__title"
						style={ { color: headingColor, textAlign: contentAlign } }
						value={ heading }
					/>
				) }
				{ ! RichText.isEmpty( tagline ) && (
					<RichText.Content
						tagName="p"
						className="ahg-card__tagline"
						style={ { color: taglineColor, textAlign: contentAlign } }
						value={ tagline }
					/>
				) }
				<div
					className="ahg-card__less-des"
					style={ { color: desColor, textAlign: contentAlign } }
				>
					{ ! RichText.isEmpty( des ) && (
						<RichText.Content multiline="p" value={ des } />
					) }
				</div>
				<div
					className="ahg-card__more-des"
					style={ { color: desColor, textAlign: contentAlign, display: 'none' } }
				>
					{ ! RichText.isEmpty( moreDes ) && (
						<RichText.Content multiline="p" value={ moreDes } />
					) }
				</div>
				{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
				<a
					className="ahg-card__toggle"
					href="#"
					style={ { textAlign: contentAlign } }
				>
					<div style={ { textAlign: contentAlign } }>
						<RichText.Content
							className="ahg-card__more-toggle-des"
							tagName="span"
							value={ moreLabel }
						/>
					</div>
					<RichText.Content
						className="ahg-card__less-toggle-des"
						tagName="span"
						value={ lessLabel }
						style={ { display: 'none', textAlign: contentAlign } }
					/>
				</a>
			</div>
		);
	},
} );
