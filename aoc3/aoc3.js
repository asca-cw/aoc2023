var aoc3 = /** @class */ (function () {
    function aoc3(path) {
        var _this = this;
        this.fs = require('fs');
        var data = this.fs.readFileSync(path, 'utf8');
        this.num_pos = [];
        this.sym_pos = [];
        this.gear_pos = [];
        this.valid_coord = [];
        this.numbers = [];
        var lines = [];
        data.split('\n').forEach(function (line, i) {
            lines.push(line);
            _this.num_pos[i] = [];
            _this.sym_pos[i] = [];
            _this.gear_pos[i] = [];
            for (var j = 0; j < line.length; j++) {
                if (_this.isNumber(line.charAt(j))) {
                    _this.num_pos[i].push(j);
                }
                if (_this.isSymbole(line.charAt(j))) {
                    _this.sym_pos[i].push(j);
                }
                if (_this.isGear(line.charAt(j))) {
                    _this.gear_pos[i].push(j);
                }
                ;
            }
        });
        this.data = lines;
    }
    aoc3.prototype.isNumber = function (char) {
        return /^\d$/.test(char);
    };
    aoc3.prototype.isSymbole = function (char) {
        return !/^[0-9\.]+$/i.test(char);
    };
    aoc3.prototype.isGear = function (char) {
        return /^[\*]$/.test(char);
    };
    aoc3.prototype.cal_valid_coord = function () {
        for (var i = 0; i < this.sym_pos.length; i++) {
            for (var j = 0; j < this.sym_pos[i].length; j++) {
                this.valid_coord.push([i - 1, this.sym_pos[i][j] - 1]);
                this.valid_coord.push([i - 1, this.sym_pos[i][j]]);
                this.valid_coord.push([i - 1, this.sym_pos[i][j] + 1]);
                this.valid_coord.push([i, this.sym_pos[i][j] - 1]);
                this.valid_coord.push([i, this.sym_pos[i][j] + 1]);
                this.valid_coord.push([i + 1, this.sym_pos[i][j] - 1]);
                this.valid_coord.push([i + 1, this.sym_pos[i][j]]);
                this.valid_coord.push([i + 1, this.sym_pos[i][j] + 1]);
            }
        }
        var tmp = new Set(this.valid_coord.map(JSON.stringify));
        this.valid_coord = Array.from(tmp, JSON.parse);
        // console.log(this.valid_coord);
    };
    aoc3.prototype.map_valid = function () {
        var _this = this;
        console.log(this.num_pos);
        this.valid_coord.forEach(function (val) {
            var x = val[0];
            var y = val[1];
            if (_this.num_pos[x].includes(y)) {
                var tmp = [];
                tmp.push(_this.data[x][y]);
                var index = _this.num_pos[x].indexOf(y);
                _this.num_pos[x].splice(index, 1);
                var start = 1;
                var stop_1 = 1;
                while (_this.num_pos[x].includes(y - start)) {
                    tmp.unshift(_this.data[x][y - start]);
                    var index_1 = _this.num_pos[x].indexOf(y - start);
                    _this.num_pos[x].splice(index_1, 1);
                    start += 1;
                }
                while (_this.num_pos[x].includes(y + stop_1)) {
                    tmp.push(_this.data[x][y + stop_1]);
                    var index_2 = _this.num_pos[x].indexOf(y + stop_1);
                    _this.num_pos[x].splice(index_2, 1);
                    stop_1 += 1;
                }
                _this.numbers.push(Number(tmp.join().replaceAll(",", "")));
            }
        });
    };
    aoc3.prototype.print_sum = function () {
        var sum = 0;
        console.log(this.numbers);
        this.numbers.forEach(function (x) { return sum += x; });
        console.log(sum);
    };
    aoc3.prototype.print = function () {
        console.log(this.gear_pos);
    };
    return aoc3;
}());
var obj = new aoc3("./data.txt");
obj.cal_valid_coord();
obj.map_valid();
obj.print_sum();
// obj.print()
