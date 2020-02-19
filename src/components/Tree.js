import React, { Component } from "react";
import values from "lodash/values";

import TreeNode from "./TreeNode";

const data = {
  "/root": {
    path: "/root",
    type: "folder",
    isRoot: true,
    children: ["/root/david", "/root/jslancer"]
  },
  "/root/david": {
    path: "/root/david",
    type: "folder",
    children: ["/root/david/readme.md"]
  },
  "/root/david/readme.md": {
    path: "/root/david/readme.md",
    type: "file",
    content: "Thanks for reading me."
  },
  "/root/jslancer": {
    path: "/root/jslancer",
    type: "folder",
    children: ["/root/jslancer/projects", "/root/jslancer/vblogs"]
  },
  "/root/jslancer/projects": {
    path: "/root/jslancer/projects",
    type: "folder",
    children: ["/root/jslancer/projects/treeview"]
  },
  "/root/jslancer/projects/treeview": {
    path: "/root/jslancer/projects/treeview",
    type: "folder",
    children: []
  },
  "/root/jslancer/vblogs": {
    path: "/root/jslancer/vblogs",
    type: "folder",
    children: []
  }
};

export default class Tree extends Component {
  state = {
    nodes: data
  };

  getRootNodes = () => {
    const { nodes } = this.state;
    return values(nodes).filter(node => node.isRoot === true);
  };

  getChildNodes = node => {
    const { nodes } = this.state;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  onToggle = node => {
    const { nodes } = this.state;
    console.log("TCL: Tree -> nodes", nodes);
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  };

  render() {
    const rootNodes = this.getRootNodes();
    return (
      <div>
        ##############
        {rootNodes.map((node, key) => (
          <TreeNode
            key={key}
            node={node}
            getChildNodes={this.getRootNodes}
            onToggle={this.onToggle}
          />
        ))}
      </div>
    );
  }
}
