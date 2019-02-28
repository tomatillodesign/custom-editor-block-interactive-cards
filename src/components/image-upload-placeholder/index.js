import classnames from 'classnames';
import { Dashicon } from '@wordpress/components';
import { MediaUpload } from '@wordpress/editor';
import SVGImageIcon from './image.js';
import './editor.scss';

const ImageUploadPlaceholder = props => {
	const {
		imageID,
		imageURL,
		onChange = ( { url, id } ) => {},
		onRemove, // = () => {},
		className = '',
		allowedTypes = [ 'image' ],
		render = undefined,
		hasRemove = true,
		style: mainStyle = {},
	} = props;

	const imageClass = classnames( [ className, 'ahg-image-upload-placeholder' ], {
		'ahg-image-upload-has-image': imageURL,
		'ahg-image-upload-has-placeholder': ! imageURL,
	} );

	const style = {
		...mainStyle,
		backgroundImage: imageURL && ! render ? `url(${ imageURL })` : undefined,
	};
	return (
		<MediaUpload
			onSelect={ onChange }
			allowedTypes={ allowedTypes }
			value={ imageID }
			render={ obj => {
				if ( imageURL && render ) {
					return (
						<div
							className={ imageClass }
							onClick={ obj.open }
							onKeyDown={ event => {
								if ( event.keyCode === 13 ) {
									obj.open();
								}
							} }
							style={ style }
							role="button"
							tabIndex={ 0 }
							data-is-placeholder-visible={ ! imageURL }
						>
							{ imageURL && onRemove && hasRemove && (
								<button
									className="ahg-image-upload-remove"
									onClick={ ev => {
										onRemove();
										ev.stopPropagation();
									} }
								>
									<Dashicon icon="no" />
								</button>
							) }
							{ render }
						</div>
					);
				}
				return (
					<div
						className={ imageClass }
						onClick={ obj.open }
						onKeyDown={ event => {
							if ( event.keyCode === 13 ) {
								obj.open();
							}
						} }
						style={ style }
						role="button"
						tabIndex={ 0 }
						data-is-placeholder-visible={ ! imageURL }
					>
						{ imageURL && onRemove && hasRemove && (
							<button
								className="ahg-image-upload-remove"
								onClick={ ev => {
									onRemove();
									ev.stopPropagation();
								} }
							>
								<Dashicon icon="no" />
							</button>
						) }

						{ ! imageURL && <SVGImageIcon /> }
					</div>
				);
			} }
		/>
	);
};

export default ImageUploadPlaceholder;
