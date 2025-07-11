;(function () {
	function initMonkProtectBanner() {
		console.log('qqq initMonkProtectBanner v8')

		document.addEventListener('click', function (e) {
			console.log('qqq click happened', e.target, e.target.id, e.target.className)

			if (e.target.className === 'monkprotect-v2-info-button') {
				console.log('qqq infoButton clicked')
				e.preventDefault()
				e.stopPropagation()
				const modal = document.getElementById('monkprotect-v2-modal')
				if (modal) {
					if (modal.parentNode !== document.body) {
						document.body.appendChild(modal)
					}
					modal.style.display = 'block'
				}
			}

			if (e.target.className === 'monkprotect-v2-close-button') {
				e.preventDefault()
				e.stopPropagation()
				const modal = document.getElementById('monkprotect-v2-modal')
				if (modal) {
					modal.style.display = 'none'
				}
			}

			if (e.target.id === 'monkprotect-v2-modal') {
				const modal = document.getElementById('monkprotect-v2-modal')
				if (modal) {
					modal.style.display = 'none'
				}
			}
		})

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				const modal = document.getElementById('monkprotect-v2-modal')
				if (modal && modal.style.display !== 'none') {
					modal.style.display = 'none'
				}
			}
		})
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initMonkProtectBanner)
	} else {
		initMonkProtectBanner()
	}
})()
