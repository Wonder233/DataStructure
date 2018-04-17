//初始化二叉搜索树
function BST() {
    this.root = null;
}

BST.prototype = {
    insert: function (data) {
        var node = {
            data: data,
            left: null,
            right: null
        };
        if (!this.root) {
            this.root = node;
        } else {
            var current = this.root;
            var parent = null;
            while (true) {
                parent = current;
                if (data < current.data) {
                    current = current.left;
                    if (!current) {
                        parent.left = node;
                        break;
                    }
                } else {
                    current = current.right;
                    if (!current) {
                        parent.right = node;
                        break;
                    }
                }
            }
        }
    },
    getMin: function (node) {
        var current = node;
        while (current.left != null) {
            current = current.left;
        }
        return current;
    },
    removeData: function (node, data) {
        if (!node) {
            return null;
        }
        if (data == node.data) {
            if (node.left == null && node.right == null) { // 无左右子树
                return null;
            }
            if (node.left == null) { // 无左子树
                return node.right;
            }
            if (node.right == null) { // 无右子树
                return node.left;
            }
            //有左右子树，则取该结点右子树的最小值来替换该结点
            var tempNode = this.getMin(node.right);
            node.data = tempNode.data;
            node.right = this.removeData(node.right, tempNode.data);
            return node;
        } else if (data < node.data) {
            node.left = this.removeData(node.left, data);
            return node;
        } else {
            node.right = this.removeData(node.right, data);
            return node;
        }
    },
    remove: function (data) {
        this.root = this.removeData(this.root, data);
    }
}

var bst = new BST();
bst.insert(62);
bst.insert(58);
bst.insert(88);
console.log(bst.root);
bst.remove(62);
console.log(bst.root);