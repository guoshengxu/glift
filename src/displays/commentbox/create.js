/**
 * Create a comment box with:
 *
 * divId: The div in which the comment box should live
 * posBbox: The bounding box of the div (expensive to recompute)
 * theme: The theme object.
 */
glift.displays.commentbox.create = function(divId, posBbox, theme) {
  if (!theme) {
    throw new Error('Theme must be defined. was: ' + theme);
  }
  return new glift.displays.commentbox._CommentBox(divId, posBbox, theme).draw();
};

glift.displays.commentbox._CommentBox = function(divId, positioningBbox, theme) {
  this.divId = divId;
  this.bbox = glift.displays.bboxFromPts(
      glift.util.point(0,0),
      glift.util.point(positioningBbox.width(), positioningBbox.height()));
  this.theme = theme;
  this.el = undefined;
};

glift.displays.commentbox._CommentBox.prototype = {
  draw: function() {
    this.el = glift.dom.elem(this.divId);
    if (this.el === null) {
      throw new Error('Could not find element with ID ' + this.divId);
    }
    var cssObj = {
      'overflow-y': 'auto',
      'overflowY': 'auto',
      'MozBoxSizing': 'border-box',
      'boxSizing': 'border-box'
    };
    for (var key in this.theme.commentBox.css) {
      cssObj[key] = this.theme.commentBox.css[key]
    }
    this.el.css(cssObj);
    return this;
  },

  sanitize: function(text) {
    return glift.displays.commentbox.sanitize(text);
  },

  setText: function(text) {
    this.el.empty();
    var textSegments = text.split('\n');
    for (var i = 0; i < textSegments.length; i++) {
      var seg = textSegments[i];
      var pNode = glift.dom.elem(document.createElement('p'));
      pNode.attr('style', 'margin-bottom: 1em;');
      pNode.appendText(seg);
      this.el.append(pNode);
    }
  },

  clearText: function() {
    this.el.html('');
  },

  destroy: function() {
    this.commentBoxObj.empty();
  }
};
