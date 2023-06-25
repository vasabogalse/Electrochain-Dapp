import React, { FC } from 'react';
import PropTypes from 'prop-types';

interface ILogoProps {
	width?: number;
	height?: number;
}
const Logo: FC<ILogoProps> = ({ width, height }) => {
	return (
		<svg
			width={height !== 854 && !!height ? height * (2155 / 854) : width}
			height={width !== 2155 && !!width ? width * (854 / 2155) : height}
			viewBox="0 0 2155 854"
   fill="none"
   version="1.1"
   id="svg24"
   xmlns="http://www.w3.org/2000/svg"
   ><defs
   id="defs28"><rect
     x="1034.7562"
     y="154.94628"
     width="293.86364"
     height="201.25207"
     id="rect347" /></defs><rect
   x="1483.9745"
   width="170.36411"
   height="160.28929"
   rx="42.591026"
   fill="#46bcaa"
   id="rect14"
   y="35.938118"
   /><ellipse
   cx="2042.7164"
   cy="500.79962"
   fill="#4d69fa"
   id="circle16"
   rx="105.33168"
   ry="102.81297"
   /><rect
   x="43.316334"
   y="50.018272"
   width="256"
   height="144"
   fill="#6c5dd3"
   id="rect18" /><path
   d="m 691.25624,638.50203 110.851,192 h -221.7022 z"
   fill="#ffcf52"
   id="path20" />
			{<path
   d="M 385.45806,56.840302 699.06448,239.82457 V 605.79006 L 385.45806,788.77433 71.851156,605.79006 V 239.82457 Z"
   fill="#8c52ff"
   id="path22"
   />}
		<path
   fill="#ffb636"
   d="m 579.24538,375.59045 -180.80393,0.65344 c -4.47313,0.0159 -7.37742,-4.53118 -5.34277,-8.36604 L 493.0357,179.53894 c 3.00501,-5.66281 -4.3511,-11.13825 -9.28908,-6.91375 L 172.58857,438.78551 c -4.0877,3.4965 -1.5514,10.00383 3.91726,10.04857 l 165.0613,1.35814 c 4.30269,0.0354 7.1576,4.3056 5.40669,8.09013 l -83.96488,181.4643 c -2.60311,5.62553 4.56028,10.72064 9.38301,6.67419 L 583.19363,385.67537 c 4.17098,-3.49835 1.58531,-10.1045 -3.94825,-10.08492 z"
   id="path185"
   />
   <text
   id="text851"
   transform="matrix(12.976385,0,0,13.815101,-9796.2137,-968.32178)">
    <tspan
     x="816.06055"
     y="113.25004"
     id="tspan1029">
    <tspan
       fill="#000000"
       fontSize={18}
       fontVariant={'bold'}
       id="tspan1025">$ </tspan><tspan
       fill="#000000"
       fontSize={24}
       id="tspan1027">ELT</tspan></tspan>
       </text>
		</svg>
	);
};
Logo.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};
Logo.defaultProps = {
	width: 2155,
	height: 854,
};

export default Logo;
