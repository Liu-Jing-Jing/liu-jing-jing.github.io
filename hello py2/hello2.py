# -*- coding: utf-8 -*-
# Python中的List和Tuple
print ['Michael', 'Bob', 'Tracy', 'Mark']

classmates = ['Michael', 'Bob', 'Tracy', 'Mark']
empty_list = []

L = ['adam', 95.5, 'lisa', 85, 'bart', 59]
print L[1]
print L[-1] #反过来取元素

# 增加新元素
L.append('Paul')
print L

# 插入指定位置
L.insert(0, 'Mark')
print L

# 删除最后一个位置的元素
print L.pop()

# 修改指定位置的元素
L[-1] = 233
print L


# Tuple的使用
t = ('Adam', 'Lisa', 'Bart')
print t
# tuple没有 append()方法，也没有insert()和pop()方法。所以，新同学没法直接往 tuple 中添加，老同学想退出 tuple 也不行。

number = (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)

t = ()
print t #清空

t = (1)
print t #正是因为用()定义单元素的tuple有歧义，所以 Python 规定，单元素 tuple 要多加一个逗号“,”，这样就避免了歧义
t = (1,)
print t


for n in number:
    print n

age = 20
if age >= 18:
    print 'your age is', age
    print 'adult'
print 'END'

if age < 18:
    print 'teenager'

if not age >= 18:
    print 'teenager'

if age >= 18:
    print 'adult'
else:
    print 'teenager'

# if-lese的缺点
if age >= 18:
    print 'adult'
else:
    if age >= 6:
        print 'teenager'
    else:
        if age >= 3:
            print 'kid'
        else:
            print 'baby'

# 这种缩进只会越来越多，代码也会越来越难看。
if age >= 18:
    print 'adult'
elif age >= 6:
    print 'teenager'
elif age >= 3:
    print 'kid'
else:
    print 'baby'


# for循环
L = [75, 92, 59, 68]
sum = 0.0
for score in L:
    sum += score
print sum / 4


N = 22
x = 0
while x < N:
    print x
    x = x + 1

sum = 0
x = 1
while (x <= 100):
    sum += x
    x+=2
print sum

sum = 0
x = 1
while True:
    sum = sum + x
    x = x + 1
    if x > 100:
        break
print sum

sum = 0
x = 1
n = 1
while True:
    sum+=x
    x=x*2
    n=n+1
    if n>20:
        break
print sum

sum = 0
x = 0
while True:
    x = x + 1
    if x > 100:
        break
    if x%2 == 0:
        continue
    
    sum += x
print sum

for x in ['A', 'B', 'C']:
    for y in ['1', '2', '3']:
        print x + y

# 嵌套两层循环，打印出十位数比个位小的
for x in [1,2,3,4,5,6,7,8,9]:
    for y in [0,1,2,3,4,5,6,7,8,9]:
        if(x<y):
            print (x*10 + y)


# dict类型的使用
d = {
    'Adam': 95,
    'Lisa': 85,
    'Bart': 59
}
print d

# 只要 key 存在，dict就返回对应的value。如果key不存在，会直接报错：KeyError。
if 'Paul' in d:
    print d['Paul']

# 二是使用dict本身提供的一个 get 方法，在Key不存在的时候，返回None
print d.get('Bart')
print d.get('Paul')

print 'Adam:',d.get('adam')
print 'Lisa:',d.get('Lisa')
print 'Bart:',d.get('Bart')

# dict的第一个特点是查找速度快，无论dict有10个元素还是10万个元素，查找速度都一样。而list的查找速度随着元素增加而逐渐下降。

# 不过dict的查找速度快不是没有代价的，dict的缺点是占用内存大，还会浪费很多内容，list正好相反，占用内存小，但是查找速度慢。

# 由于dict是按 key 查找，所以，在一个dict中，key不能重复。

# dict的第二个特点就是存储的key-value序对是没有顺序的！这和list不一样：

# dict的第三个特点是作为 key 的元素必须不可变，Python的基本类型如字符串、整数、浮点数都是不可变的，都可以作为 key。但是list是可变的，就不能作为 key。

testDict = {
    '123': [1, 2, 3],  # key 是 str，value是list
    123: '123',  # key 是 int，value 是 str
    ('a', 'b'): True  # key 是 tuple，并且tuple的每个元素都是不可变对象，value是 boolean
}

for key in d:
    print key

for key in d:
    print key, ':', d[key]


# set的使用
s = set(['A', 'B', 'C', 'C'])
print s
print 'A' in s # 注意大小写的哦。区分大小写，a和A代表不同元素


# Python中set的特点

#set的内部结构和dict很像，唯一区别是不存储value，因此，判断一个元素是否在set中速度很快。
#set存储的元素和dict的key类似，必须是不变对象，因此，任何可变对象是不能放入set中的。
#最后，set存储的元素也是没有顺序的。

# set的使用场景
weekdays = set(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'])
# 用户输入的字符串
x = '???'
if x in weekdays:
    print 'input ok'
else:
    print 'input error'


months = set(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
x1 = 'Feb'
x2 = 'Sun'

if x1 in months:
    print 'x1: ok'
else:
    print 'x1: error'

if x2 in months:
    print 'x2: ok'
else:
    print 'x2: error'

# set的遍历
for name in months:
    print name


s = set([('Adam', 95), ('Lisa', 85), ('Bart', 59)])
for x in s:
    print x[0],':',x[1]



# set添加新元素
s.add(4)
print s

s.remove(4)
print s
# 如果删除的元素不存在set中，remove()会报错, 所以要判断：
# Traceback (most recent call last):
# File "<stdin>", line 1, in <module>
# KeyError: 4

s = set(['Adam', 'Lisa', 'Paul'])
L = ['Adam', 'Lisa', 'Bart', 'Paul']
for element in L:
    if element in s:
        s.remove(element)
    else:
        s.add(element)
print s


#当我们知道半径r的值时，就可以根据公式计算出面积。假设我们需要计算3个不同大小的圆的面积：
#r1 = 12.34
#r2 = 9.08
#r3 = 73.1
#s1 = 3.14 * r1 * r1
#s2 = 3.14 * r2 * r2
#s3 = 3.14 * r3 * r3
#当代码出现有规律的重复的时候，你就需要当心了，每次写3.14 * x * x不仅很麻烦，而且，如果要把3.14改成3.14159265359的时候，得全部替换。

#有了函数，我们就不再每次写s = 3.14 * x * x，而是写成更有意义的函数调用 s = area_of_circle(x)，而函数 area_of_circle 本身只需要写一次，就可以多次调用。

######
#抽象是数学中非常常见的概念。举个例子：

#计算数列的和，比如：1 + 2 + 3 + ... + 100，写起来十分不方便，于是数学家发明了求和符号∑，可以把1 + 2 + 3 + ... + 100记作：
#100
#∑n
#n=1
#这种抽象记法非常强大，因为我们看到∑就可以理解成求和，而不是还原成低级的加法运算。


# 函数的简单使用(标准库的函数)
print abs(-20)

print cmp(1, 2)
print cmp(2, 1)
print cmp(3, 3)

print int(123)
print int(12.13)

print str(123)
print str(123.13)

L = []
x=1
while True:
    if x==101:
        break
    L.append(x**2)
    x=x+1


# 定义函数
def my_abs(x):
    if x >= 0:
        return x
    else:
        return -x

print my_abs(-22)
# 如果没有return语句，函数执行完毕后也会返回结果，只是结果为 None。
# return None可以简写为return。

def square_of_sum(L):
    sum = 0
    for x in L:
        sum += (x*x)
    return sum;

print square_of_sum([1, 2, 3, 4, 5])
print square_of_sum([-5, 0, 5, 15, 25])

# 如果没有return语句，函数执行完毕后也会返回结果，只是结果为 None。
# return None可以简写为return。
# 如果没有return语句，函数执行完毕后也会返回结果，只是结果为 None。
# return None可以简写为return。