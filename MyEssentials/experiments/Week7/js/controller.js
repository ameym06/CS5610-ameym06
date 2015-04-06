function rawMaterialLibraryController($scope) {
    var rawMaterial1 = {
        Product: "Paper",
        Quantity: "30 tons",
        Amount: "30",
    };
    var rawMaterial2 = {
        Product: "Partitions",
        Quantity: "2000",
        Amount: "12",
    };
    var rawMaterial3 = {
        Product: "Gum",
        Quantity: "232",
        Amount: "232",
    };
    var rawMaterials = [rawMaterial1, rawMaterial2, rawMaterial3];
    $scope.rawMaterials = rawMaterials;

    $scope.select = function (rawMaterial) {
        console.log(rawMaterial);
        $scope.newrawMaterial = rawMaterial;
    }

    $scope.delete = function (rawMaterial) {
        var index = $scope.rawMaterials.indexOf(rawMaterial);
        $scope.rawMaterials.splice(index, 1);
    }
    $scope.add = function () {
        console.log($scope.newrawMaterial);
        var rawMaterial = {
            Product: $scope.newrawMaterial.Product,
            Quantity: $scope.newrawMaterial.Quantity,
            Amount: $scope.newrawMaterial.Amount
        };
        $scope.rawMaterials.push(rawMaterial);
    }
}