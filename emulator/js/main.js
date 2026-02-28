var gba;
var runCommands = [];

// Set up the emulator
try {
    gba = new GameBoyAdvance();
    gba.keypad.eatInput = true;

    gba.setLogger(function (level, error) {
        console.error(error);

        gba.pause();

        var screen = document.getElementById('screen');

        if (screen.getAttribute('class') == 'dead') {
            console.log('Game has crashed multiple times without resetting...')
            return;
        }

        // Show error image in emulator screen
        var crash = document.createElement('img');
        crash.setAttribute('id', 'crash');

        // Insert crash image before screen
        screen.parentElement.insertBefore(crash, screen);
        screen.setAttribute('class', 'dead');
    });
} catch (e) {
    gba = null;
}

function run(file) {
    gba.loadRomFromFile(file, function (result) {
        if (result) {
            for (var i = 0; i < runCommands.length; ++i) {
                runCommands[i]();
            }
            runCommands = [];
            gba.runStable();
        } else {
            console.error('Failed to load ROM');
        }
    });
}

function fadeOut(id, nextId, kill) {
    var e = document.getElementById(id);
    var e2 = document.getElementById(nextId);

    if (!e) {
        return;
    }

    var removeSelf = function () {
        if (kill) {
            e.parentElement.removeChild(e);
        } else {
            e.setAttribute('class', 'dead');
            e.removeEventListener('webkitTransitionEnd', removeSelf);
            e.removeEventListener('oTransitionEnd', removeSelf);
            e.removeEventListener('transitionend', removeSelf);
        }

        // Hide e2 initially, then unhide
        if (e2) {
            e2.setAttribute('class', 'hidden');
            setTimeout(function () {
                e2.removeAttribute('class');
            }, 0);
        }
    }
    e.addEventListener('webkitTransitionEnd', removeSelf, false);
    e.addEventListener('oTransitionEnd', removeSelf, false);
    e.addEventListener('transitionend', removeSelf, false);
    e.setAttribute('class', 'hidden');
}

// Initialise emulator when browser loads
window.onload = function () {
    if (gba && FileReader) {
        var canvas = this.document.getElementById('screen');
        gba.setCanvas(canvas);

        gba.logLevel = gba.LOG_ERROR;

        // Load the BIOS file of GBA
        loadRom('resources/bios.bin', function (bios) {
            gba.setBios(bios);

            // Only fetch the ROM after BIOS is ready
            fetch('resources/looper.gba')
                .then(r => r.blob())
                .then(blob => run(blob));
        });
    } else {
        var dead = this.document.getElementById('controls');
        dead.parentElement.removeChild(dead);
    }
}

