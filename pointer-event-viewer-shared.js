// Mouse event viewer - shared
// Gary Kacmarcik - garykac@{gmail|google}.com

var _pointer_event_info = [
	["pointercancel", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {},
		},
		"#e0e0e0"],
	["pointerdown", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {},
		},
		"#e0e0e0"],
	["pointerenter", {
		'preventDefault': {'checked': false},
		'stopPropagation': {'enabled': false, 'checked': false},
		'ShowEvents': {},
		'Highlight': {},
		},
		"#ccffcc"],
	["pointerleave", {
		'preventDefault': {'checked': false},
		'stopPropagation': {'enabled': false, 'checked': false},
		'ShowEvents': {},
		'Highlight': {},
		},
		"#ffcccc"],
	["pointermove", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {'checked': false},
		},
		"#ffffff"],
	["pointerout", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {'checked': false},
		},
		"repeating-linear-gradient(-45deg, #fcc, #fcc 8px, #fff 8px, #fff 16px)"],
	["pointerover", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {'checked': false},
		},
		"repeating-linear-gradient(-45deg, #cfc, #cfc 8px, #fff 8px, #fff 16px)"],
	["pointerup", {
		'preventDefault': {'checked': false},
		'stopPropagation': {},
		'ShowEvents': {},
		'Highlight': {},
		},
		"#e0e0e0"],
];

var _lastMouseMoveTarget = "";
var _mouseMoveCount = 0;

function setUserAgentText() {
	var userAgent = navigator.userAgent;
	uaDiv = document.getElementById("useragent");
	setText(uaDiv, userAgent);
}

function resetTable() {
	clearTable();
	initOutputTable(_pointer_table_info);
}

function init_shared() {
	setUserAgentText();
	var extra_options = [
		["checkbox", "combine_pointermove", "Combine mousemove events with same target", {}],
		["text", "Note: Options apply to new events only."],
		["text", "Press 'c' to Clear Table."],
	];
	createOptions(document.getElementById("options"), _pointer_event_info, _pointer_table_info, extra_options);
	injectCustomCSS(_pointer_event_info, _pointer_table_info);
	resetTable();
}

function onPointerCancel(handler, e) {
	handlePointerEvent("pointercancel", handler, e);
}

function onPointerDown(handler, e) {
	handlePointerEvent("pointerdown", handler, e);
}

function onPointerEnter(handler, e) {
	handlePointerEvent("pointerenter", handler, e);
}

function onPointerLeave(handler, e) {
	handlePointerEvent("pointerleave", handler, e);
}

function onPointerMove(handler, e) {
	_mouseMoveCount++;
	var saveMouseMoveCount = _mouseMoveCount;

	// Combine duplicate move moves in the same target by removing last one.
	var combine = document.getElementById("combine_pointermove");
	var show = document.getElementById("show_pointermove");
	if (show.checked && combine.checked && _lastMouseMoveTarget == e.target.id)
		deleteLastOutputRow();

	handlePointerEvent("pointermove", handler, e);

	_lastMouseMoveTarget = e.target.id;
	_mouseMoveCount = saveMouseMoveCount;
}

function onPointerOut(handler, e) {
	handlePointerEvent("pointerout", handler, e);
}

function onPointerOver(handler, e) {
	handlePointerEvent("pointerover", handler, e);
}

function onPointerUp(handler, e) {
	handlePointerEvent("pointerup", handler, e);
}

function handlePointerEvent(etype, handler, e) {
	var show = document.getElementById("show_" + etype);
	if (show.checked) {
		addPointerEvent(etype, handler, e);
	}
	handleDefaultPropagation(etype, e);

	_lastMouseMoveTarget = "";
	_mouseMoveCount = 0;
}

function addPointerEvent(etype, handler, e) {
	if (!e) {
		e = window.event;
	}
	var target = e.target.id;
	var relatedTarget = e.relatedTarget ? e.relatedTarget.id : "";
	var handler = handler.id;
	var eventinfo = {};
	eventinfo["Event type"] = calcHilightString(etype, e.type, true);
	eventinfo["Count"] = (etype == "pointermove" ? _mouseMoveCount : "");

	eventinfo["A"] = (target == "div_a" ? "A" : "");
	eventinfo["B"] = (target == "div_b" ? "B" : "");
	eventinfo["C"] = (target == "div_c" ? "C" : "");
	eventinfo["sD"] = (target == "div_d" ? "sD" : "");
	eventinfo["sE"] = (target == "div_e" ? "sE" : "");

	eventinfo["rA"] = (relatedTarget == "div_a" ? "A" : "");
	eventinfo["rB"] = (relatedTarget == "div_b" ? "B" : "");
	eventinfo["rC"] = (relatedTarget == "div_c" ? "C" : "");
	eventinfo["srD"] = (relatedTarget == "div_d" ? "sD" : "");
	eventinfo["srE"] = (relatedTarget == "div_e" ? "sE" : "");

	eventinfo["hA"] = (handler == "div_a" ? (handler == target ? "-" : "A") : "");
	eventinfo["hB"] = (handler == "div_b" ? (handler == target ? "-" : "B") : "");
	eventinfo["hC"] = (handler == "div_c" ? (handler == target ? "-" : "C") : "");

	eventinfo["eventPhase"] = getEventPhase(e);
	eventinfo["bubbles"] = e.bubbles;
	eventinfo["cancelable"] = e.cancelable;
	eventinfo["defaultPrevented"] = e.defaultPrevented;
	eventinfo["composed"] = e.composed;
	eventinfo["isTrusted"] = e.isTrusted;
	eventinfo["timeStamp"] = e.timeStamp;

	eventinfo["view"] = calcString(e.view !== null ? e.view.name : "null");
	eventinfo["detail"] = e.detail;

	eventinfo["screenX"] = e.screenX;
	eventinfo["screenY"] = e.screenY;
	eventinfo["clientX"] = e.clientX;
	eventinfo["clientY"] = e.clientY;

	eventinfo["movementX"] = e.movementX;
	eventinfo["movementY"] = e.movementY;

	eventinfo["offsetX"] = e.offsetX;
	eventinfo["offsetY"] = e.offsetY;
	eventinfo["pageX"] = e.pageX;
	eventinfo["pageY"] = e.pageY;
	eventinfo["x"] = e.x;
	eventinfo["y"] = e.y;

	var button = "-";
	if (etype == "pointerdown" || etype == "pointerup") {
		button = e.button;
	}
	eventinfo["button"] = button;
	eventinfo["buttons"] = e.buttons;

	eventinfo["getModifierState"] = getModifierState(e);
	eventinfo["shift"] = e.shiftKey;
	eventinfo["ctrl"] = e.ctrlKey;
	eventinfo["alt"] = e.altKey;
	eventinfo["meta"] = e.metaKey;

  eventinfo["pointerId"] = e.pointerId;
  eventinfo["width"] = e.width;
  eventinfo["height"] = e.height;
  eventinfo["pressure"] = e.pressure;
  eventinfo["tangentialPressure"] = e.tangentialPressure;
  eventinfo["tiltX"] = e.tiltX;
  eventinfo["tiltY"] = e.tiltY;
  eventinfo["twist"] = e.twist;
  eventinfo["altitudeAngle"] = e.altitudeAngle;
  eventinfo["azimuthAngle"] = e.azimuthAngle;
  eventinfo["pointerType"] = e.pointerType;
  eventinfo["isPrimary"] = e.isPrimary;
  eventinfo["persistentDeviceId"] = e.persistentDeviceId;

	addEventToOutput(eventinfo);
}
