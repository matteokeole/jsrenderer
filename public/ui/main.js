export const GUI = {
	init: object => {
		const
			container = document.forms["camera"],
			fov = container.elements["fov"],
			px = container.elements["px"],
			py = container.elements["py"],
			pz = container.elements["pz"],
			rx = container.elements["rx"],
			ry = container.elements["ry"],
			rz = container.elements["rz"];

		fov.value = object.fov;
		fov.addEventListener("input", () => {
			object.fov = +fov.value;
			object.updateProjectionMatrix();
		});

		px.value = object.position.x;
		px.addEventListener("input", () => object.position.x = +px.value);
		py.value = object.position.y;
		py.addEventListener("input", () => object.position.y = +py.value);
		pz.value = object.position.z;
		pz.addEventListener("input", () => object.position.z = +pz.value);

		rx.value = object.rotation.x;
		rx.addEventListener("input", () => object.rotation.x = +rx.value);
		ry.value = object.rotation.y;
		ry.addEventListener("input", () => object.rotation.y = +ry.value);
		rz.value = object.rotation.z;
		rz.addEventListener("input", () => object.rotation.z = +rz.value);

		enableDragAndDrop(container);
	},
	updateProperties: properties => {
		let container = document.forms["camera"],
			keys = Object.keys(properties);

		for (let i in properties) {
			const input = container.elements[i];

			input.value = properties[i].toFixed(3);
		}
	},
};

const
	enableDragAndDrop = element => {
		const
			header = element.firstElementChild,
			rect = element.getBoundingClientRect(),
			w = rect.right,
			h = rect.bottom,
			grab = e => {
				prevX = e.clientX;
				prevY = e.clientY;

				addEventListener("mousemove", move);
				addEventListener("mouseup", release);
			},
			move = e => {
				nextX = prevX - e.clientX;
				nextY = prevY - e.clientY;

				prevX = e.clientX;
				prevY = e.clientY;

				let x = element.offsetLeft - nextX,
					y = element.offsetTop - nextY;

				if (x >= 0 && x + w <= screenWidth) element.style.left = `${element.offsetLeft - nextX}px`;
				if (y >= 0 && y + h <= screenHeight) element.style.top = `${element.offsetTop - nextY}px`;
			},
			release = e => {
				removeEventListener("mousemove", move);
				removeEventListener("mouseup", release);
			};
		let prevX, prevY, nextX, nextY;

		header ?
			header.addEventListener("mousedown", grab) :
			element.addEventListener("mousedown", grab);
	},
	resize = () => {
		screenWidth = innerWidth;
		screenHeight = innerHeight;
	};
let screenWidth = innerWidth,
	screenHeight = innerHeight;

addEventListener("resize", resize);