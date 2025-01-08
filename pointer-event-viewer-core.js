// Mouse event viewer
// Gary Kacmarcik - garykac@{gmail|google}.com

var _pointer_table_info = [
	// Unlabeled group
	["", "etype", [
		["#", "etype", "text"],
		["Event type", "etype", "html"],
		["Count", "etype", "text"],
	], {
		'grouplabel': false,
		'header-background': "#e0e0e0"
	}],

	// MouseEvent - Target
	["Target", "target", [
		["A", "target", "text", {'style': 'hilite_div_a'}],
		["B", "target", "text", {'style': 'hilite_div_b'}],
		["C", "target", "text", {'style': 'hilite_div_c'}],
	], {
		'checked': true,
		'header-background': "#ffffff"
	}],

	// MouseEvent - relatedTarget
	["relatedTarget", "relatedTarget", [
		["rA", "relatedTarget", "text", {'style': 'hilite_related_a'}],
		["rB", "relatedTarget", "text", {'style': 'hilite_related_b'}],
		["rC", "relatedTarget", "text", {'style': 'hilite_related_c'}],
	], {
		'checked': false,
		'header-background': "#ffffff"
	}],

	// MouseEvent - Handler
	["Handler", "handler", [
		["hA", "handler", "text", {'style': 'hilite_handler_a'}],
		["hB", "handler", "text", {'style': 'hilite_handler_b'}],
		["hC", "handler", "text", {'style': 'hilite_handler_c'}],
	], {
		'checked': false,
		'header-background': "#c0c0ff"
	}],

	// Event
	["Event", "event", [
		["eventPhase", "event", "text"],
		["bubbles", "event", "bool"],
		["cancelable", "event", "bool"],
		["defaultPrevented", "event", "bool"],
		["composed", "event", "bool"],
		["isTrusted", "event", "bool"],
		["timeStamp", "event", "text"],
	], {
		'checked': false,
		'header-background': "#a0ffff"
	}],

	// UIEvent
	["UIEvent", "uievent", [
		["view", "uievent", "text"],
		["detail", "uievent", "text"],
	], {
		'checked': false,
		'header-background': "#ffffff"
	}],

  // PointerEvent - UI Event
  ["PointerEvent", "pointerevent", [
    ["pointerId", "pointerevent", "text"],
    ["width", "pointerevent", "text"],
    ["height", "pointerevent", "text"],
    ["pressure", "pointerevent", "text"],
    ["persistentDeviceId", "pointerevent", "text"],
    ["tiltX", "pointerevent", "text"],
    ["tiltY", "pointerevent", "text"],
    ["twist", "pointerevent", "text"],
    ["altitudeAngle", "pointerevent", "text"],
    ["azimuthAngle", "pointerevent", "text"],
    ["pointerType", "pointerevent", "text"],
    ["isPrimary", "pointerevent", "text"],
    ["persistentDeviceId", "pointerevent", "text"],
  ], {
    'checked': true,
		'header-background': "#c0ffff"
  }],

	// MouseEvent - UI Events
	["MouseEvent", "mouseevent", [
		["screenX", "mouseevent", "text"],
		["screenY", "mouseevent", "text"],
		["clientX", "mouseevent", "text"],
		["clientY", "mouseevent", "text"],
	], {
		'checked': false,
		'header-background': "#ffffc0"
	}],

	// PointerLock
	["PointerLock", "plock", [
		["movementX", "plock", "text"],
		["movementY", "plock", "text"],
	], {
		'checked': false,
		'header-background': "#e0a0e0"
	}],

	// CSSOM
	["CSSOM", "cssom", [
		["offsetX", "cssom", "text"],
		["offsetY", "cssom", "text"],
		["pageX", "cssom", "text"],
		["pageY", "cssom", "text"],
		["x", "cssom", "text"],
		["y", "cssom", "text"],
	], {
		'checked': false,
		'header-background': "#c0f0c0"
	}],

	// MouseEvent - UI Events
	["Buttons", "buttons", [
		["button", "buttons", "text"],
		["buttons", "buttons", "text"],
	], {
		'checked': false,
		'header-background': "#e0e0e0"
	}],
];

function init() {
	init_shared();

	var div_a = document.getElementById("div_a");
	var div_b = document.getElementById("div_b");
	var div_c = document.getElementById("div_c");
	for (var div of [div_a, div_b, div_c]) {
		addEventListener(div, "pointercancel", onPointerCancel.bind(null, div));
		addEventListener(div, "pointerdown", onPointerDown.bind(null, div));
		addEventListener(div, "pointerenter", onPointerEnter.bind(null, div));
		addEventListener(div, "pointerleave", onPointerLeave.bind(null, div));
		addEventListener(div, "pointermove", onPointerMove.bind(null, div));
		addEventListener(div, "pointerout", onPointerOut.bind(null, div));
		addEventListener(div, "pointerover", onPointerOver.bind(null, div));
		addEventListener(div, "pointerup", onPointerUp.bind(null, div));
	}
}
