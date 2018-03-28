import random

d = {}
d['A'] = ('b','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z')
d['B'] = ('a','e','i','o','r','u')
d['C'] = ('a','e','h','i','l','o','r','u')
d['D'] = ('a','e','i','o','r','u')
d['E'] = ('b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','y','z')
d['F'] = ('a','e','i','l','o','r','u')
d['G'] = ('a','e','i','k','l','o','r','u')
d['H'] = ('a','e','i','o','u')
d['I'] = ('b','d','f','g','j','k','l','m','n','p','r','s','t','v')
d['J'] = ('a','e','i','o','u')
d['K'] = ('a','e','i','l','o','r','s','u')
d['L'] = ('a','e','i','o','u')
d['M'] = ('a','e','i','o','r','u')
d['N'] = ('a','e','i','o','r','u')
d['O'] = ('b','d','f','g','j','k','l','m','n','p','r','s','t','v','w','z')
d['P'] = ('a','e','h','i','l','o','r','u')
d['R'] = ('a','e','i','o','u')
d['S'] = ('a','e','h','i','k','l','n','o','p','r','t','u','w')
d['T'] = ('a','e','h','i','k','l','o','r','s','u')
d['U'] = ('b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','z')
d['V'] = ('a','e','i','o','u')
d['W'] = ('a','e','i','o','u')
d['Y'] = ('a','i','o')
d['Z'] = ('a','e','i','o','u')

def makeword(word, curr_len, final_len):
    if curr_len == 0: # first letter in word
        print("Generating a", final_len, "letter word:")
        word += random.choice(list(d.keys()))
        curr_len += 1
        return makeword(word, curr_len, final_len)
    elif curr_len == final_len: # return word once we reach the desired length
        return word
    else: # recursively build the rest of the word
        while True:
            letter = random.choice(d[word[-1:]]).upper()
            if letter != word[-1:]: # no repetition of letters
                break
        word += letter
        curr_len += 1
        return makeword(word, curr_len, final_len)

word = makeword('', 0, 5)
print(word)

#lists = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,R,S,T,U,V,W,Y,Z]
#start = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','y','z']
