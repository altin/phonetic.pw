import random

dict = {}
dict['A'] = ('b','d','f','g','h','i','j','k','l','m','n','p','r','s','t','v','w','y','z')
dict['B'] = ('a','e','i','o','r','u')
dict['C'] = ('a','e','h','i','l','o','r','u')
dict['D'] = ('a','e','i','o','r','u')
dict['E'] = ('b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','w','y','z')
dict['F'] = ('a','e','i','l','o','r','u')
dict['G'] = ('a','e','i','k','l','o','r','u')
dict['H'] = ('a','e','i','o','u')
dict['I'] = ('b','d','f','g','j','k','l','m','n','p','r','s','t','v')
dict['J'] = ('a','e','i','o','u')
dict['K'] = ('a','e','i','l','o','r','s','u')
dict['L'] = ('a','e','i','o','u')
dict['M'] = ('a','e','i','o','r','u')
dict['N'] = ('a','e','i','o','r','u')
dict['O'] = ('b','d','f','g','j','k','l','m','n','p','r','s','t','v','w','z')
dict['P'] = ('a','e','h','i','l','o','r','u')
dict['R'] = ('a','e','i','o','u')
dict['S'] = ('a','e','h','i','k','l','n','o','p','r','t','u','w')
dict['T'] = ('a','e','h','i','k','l','o','r','s','u')
dict['U'] = ('b','d','f','g','h','j','k','l','m','n','p','r','s','t','v','z')
dict['V'] = ('a','e','i','o','u')
dict['W'] = ('a','e','i','o','u')
dict['Y'] = ('a','i','o')
dict['Z'] = ('a','e','i','o','u')

def makeword(word,curr_len,final_len,dict):
    if curr_len == 0: # first letter in word
        print "Generating a", final_len, "letter word:"
        word += random.choice(dict.keys())
        curr_len += 1
        return makeword(word,curr_len,final_len,dict)
    elif curr_len == final_len: # return word once we reach the desired length
        return word
    else: # recursively build the rest of the word
        while True:
            letter = random.choice(dict[word[-1:]]).upper()
            if letter != word[-1:]: # no repetition of letters
                break
        word += letter
        curr_len += 1
        return makeword(word,curr_len,final_len,dict)

words = makeword('',0,5,dict)
print words

#lists = [A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,R,S,T,U,V,W,Y,Z]
#start = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','r','s','t','u','v','w','y','z']