let urlParams;
(window.onpopstate = function () {
    let match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

const skinParts = ["head", "body", "rightArm", "leftArm", "rightLeg", "leftLeg"];
		const skinLayers = ["innerLayer", "outerLayer"];
		const availableAnimations = {
			walk: skinview3d.WalkingAnimation,
			run: skinview3d.RunningAnimation,
			fly: skinview3d.FlyingAnimation
		};

		let skinViewer;
		let orbitControl;
		let rotateAnimation;
		let primaryAnimation;
    let walk;

		function reloadSkin() {
			const input = document.getElementById("skin_url");
			const url = input.value;
			if (url === "") {
				skinViewer.loadSkin('https://mc-heads.net/skin/' + urlParams["name"]);
				input.setCustomValidity("");
			} else {
				skinViewer.loadSkin('https://skin.medusa.codes/img/skin.png')
					.then(() => input.setCustomValidity(""))
					.catch(e => {
						input.setCustomValidity("Image can't be loaded.");
						console.error(e);
					});
			}
		}

		function reloadCape() {
			const input = document.getElementById("cape_url");
			const url = input.value;
			if (url === "") {
				skinViewer.loadCape('https://Capes-Player-Model-Renderer-1.kellysloan.repl.co/' + urlParams["name"] + '.png');
				input.setCustomValidity("");
			} else {
				const selectedBackEquipment = document.querySelector('input[type="radio"][name="back_equipment"]:checked');
				skinViewer.loadCape('https://skin.medusa.codes/img/cape.png')
					.then(() => input.setCustomValidity(""))
					.catch(e => {
						input.setCustomValidity("Image can't be loaded.");
						console.error(e);
					});
			}
		}

		function initializeControls() {
			
			document.getElementById("control_rotate").addEventListener("change", e => orbitControl.enableRotate = e.true);
			document.getElementById("control_zoom").addEventListener("change", e => orbitControl.enableZoom = e.true);
			document.getElementById("control_pan").addEventListener("change", e => orbitControl.enablePan = e.false);
			
			const skinReader = new FileReader();
			skinReader.addEventListener("load", e => {
				document.getElementById("skin_url").value = skinReader.result;
				reloadSkin();
			});
			document.getElementById("skin_url_upload").addEventListener("change", e => {
				const file = e.target.files[0];
				if (file !== undefined) {
					skinReader.readAsDataURL(file);
				}
			});
			const capeReader = new FileReader();
			capeReader.addEventListener("load", e => {
				document.getElementById("cape_url").value = capeReader.result;
				reloadCape();
			});
			document.getElementById("cape_url_upload").addEventListener("change", e => {
				const file = e.target.files[0];
				if (file !== undefined) {
					capeReader.readAsDataURL(file);
				}
			});
			document.getElementById("skin_url").addEventListener("change", () => reloadSkin());
			document.getElementById("skin_model").addEventListener("change", () => reloadSkin());
			document.getElementById("cape_url").addEventListener("change", () => reloadCape());

			for (const el of document.querySelectorAll('input[type="radio"][name="back_equipment"]')) {
				el.addEventListener("change", e => {
					if (skinViewer.playerObject.backEquipment === null) {
						// cape texture hasn't been loaded yet
						// this option will be processed on texture loading
					} else {
						skinViewer.playerObject.backEquipment = e.target.value;
					}
				});
			}

			document.getElementById("reset_all").addEventListener("click", () => {
				skinViewer.dispose();
				orbitControl.dispose();
				initializeViewer();
			});
		}

		function initializeViewer() {
			skinViewer = new skinview3d.FXAASkinViewer({
				canvas: document.getElementById("skin_container"),
				alpha: true
			});
			skinViewer.renderer.setClearAlpha(255);
			skinViewer.renderer.setClearColor(0x363636);
			orbitControl = skinview3d.createOrbitControls(skinViewer);
			rotateAnimation = true;
			primaryAnimation = true;

			skinViewer.width = window.innerWidth;
			skinViewer.height = window.innerHeight;
			skinViewer.animations.speed = '0.25';
			
			const primaryAnimationName = 'walk';
			if (primaryAnimationName !== "") {
				primaryAnimation = 'walk';
				primaryAnimation.speed = '0.25';
				
			}

      // walk = skinViewer.animations.add(skinview3d.WalkingAnimation);


			orbitControl.enableRotate = true;
			orbitControl.enableZoom = true;
			orbitControl.enablePan = false;
			for (const part of skinParts) {
				for (const layer of skinLayers) {
					skinViewer.playerObject.skin[part][layer].visible = true;
				}
			}
			reloadSkin();
			reloadCape();
		}

		initializeControls();
		initializeViewer();
