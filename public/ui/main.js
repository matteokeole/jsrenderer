export const initInterface = camera => {
	const card = document.querySelector("#camera");
	const fov = card.querySelector("#fov");

	fov.addEventListener("input", function() {
		// Update camera field of view
		camera.fov = +this.value;
		camera.updateProjectionMatrix();
	});

	enableDragAndDrop(card);
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